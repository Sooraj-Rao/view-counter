"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, Copy } from "lucide-react";
import { API_URL } from "@/lib/utils";

export default function Create() {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copy, setCopy] = useState(false);
  const [error, setError] = useState("");
  const [createdUrl, setCreatedUrl] = useState(Cookies.get("token") || "");
  const router = useRouter();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();
      if (!response.ok || data.error) {
        throw new Error(data.error || "Failed to create counter");
      }

      const newUrl = `${API_URL}/${data.url}`;
      setCreatedUrl(newUrl);
      Cookies.set("token", newUrl, { expires: 7 });
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopy(true);
    setTimeout(() => setCopy(false), 1400);
  };

  const RenderCopySection = ({
    lable,
    value,
  }: {
    lable: string;
    value: string;
  }) => (
    <div className="space-y-2">
      <Label>{lable}</Label>
      <div className="relative">
        <Input readOnly value={value} />
        <Button
          size="icon"
          variant="ghost"
          className="absolute right-0 top-0 p-1 bg-secondary"
          onClick={() => copyToClipboard(value)}
        >
          {copy ? (
            <Check className="h-4 w-4" />
          ) : (
            <Copy className="h-4 w-4   " />
          )}
          <span className="sr-only">Copy</span>
        </Button>
      </div>
    </div>
  );

  return (
    <div className=" mx-auto px-4 py-8 ">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className=" text-lg sm:text-3xl">Create a View Counter</CardTitle>
          <CardDescription>
            Generate a unique counter for your project
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!createdUrl ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="url">Unique Identifier</Label>
                <Input
                  type="text"
                  id="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="e.g., your-name or your-project"
                  required
                />
              </div>
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? "Creating..." : "Create Counter"}
              </Button>
            </form>
          ) : (
            <Tabs defaultValue="html" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="url">URL</TabsTrigger>
                <TabsTrigger value="html">HTML</TabsTrigger>
                <TabsTrigger value="markdown">Markdown</TabsTrigger>
              </TabsList>
              <TabsContent value="url" className="mt-4">
                <RenderCopySection lable="Full Url" value={createdUrl} />
              </TabsContent>
              <TabsContent value="html" className="mt-4">
                <RenderCopySection
                  lable="HTML Image Tag"
                  value={`<img src="${createdUrl}" alt="View Count" />`}
                />
              </TabsContent>
              <TabsContent value="markdown" className="mt-4">
                <RenderCopySection
                  lable="Markdown Image"
                  value={`![View Count](${createdUrl})`}
                />
              </TabsContent>
            </Tabs>
          )}
        </CardContent>
        <CardFooter>
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </CardFooter>
      </Card>
    </div>
  );
}
