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
import { ClipboardCopy } from "lucide-react";
import { API_URL } from "@/lib/utils";

export default function Create() {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [createdUrl, setCreatedUrl] = useState(Cookies.get("token") || "");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        throw new Error("Failed to create counter");
      }

      const data = await response.json();
      const newUrl = `${API_URL}/${data.url}`;
      setCreatedUrl(newUrl);
      Cookies.set("token", newUrl, { expires: 7 });
      router.refresh();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(`An error occurred: ${err.message}`);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl">Create a View Counter</CardTitle>
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
                <TabsTrigger value="html">HTML</TabsTrigger>
                <TabsTrigger value="markdown">Markdown</TabsTrigger>
                <TabsTrigger value="readme">README</TabsTrigger>
              </TabsList>
              <TabsContent value="html" className="mt-4">
                <div className="space-y-2">
                  <Label>HTML Image Tag</Label>
                  <div className="relative">
                    <Input
                      readOnly
                      value={`<img src="${createdUrl}" alt="View Count" />`}
                    />
                    <Button
                      size="icon"
                      variant="ghost"
                      className="absolute right-0 top-0"
                      onClick={() =>
                        copyToClipboard(
                          `<img src="${createdUrl}" alt="View Count" />`
                        )
                      }
                    >
                      <ClipboardCopy className="h-4 w-4" />
                      <span className="sr-only">Copy</span>
                    </Button>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="markdown" className="mt-4">
                <div className="space-y-2">
                  <Label>Markdown Image</Label>
                  <div className="relative">
                    <Input readOnly value={`![View Count](${createdUrl})`} />
                    <Button
                      size="icon"
                      variant="ghost"
                      className="absolute right-0 top-0"
                      onClick={() =>
                        copyToClipboard(`![View Count](${createdUrl})`)
                      }
                    >
                      <ClipboardCopy className="h-4 w-4" />
                      <span className="sr-only">Copy</span>
                    </Button>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="readme" className="mt-4">
                <div className="space-y-2">
                  <Label>README Example</Label>
                  <div className="relative">
                    <textarea
                      readOnly
                      className="w-full h-32 p-2 text-sm font-mono bg-gray-100 rounded-md"
                      value={`# My Awesome Project

![GitHub stars](https://img.shields.io/github/stars/yourusername/your-repo?style=social)
![View Count](${createdUrl})

## About

This is my awesome project. Check out how many people have viewed it!

## Features

- Feature 1
- Feature 2
- Feature 3

## Installation

\`\`\`
npm install my-awesome-project
\`\`\`

## Usage

\`\`\`javascript
const myAwesomeProject = require('my-awesome-project');
myAwesomeProject.doSomethingAwesome();
\`\`\`

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.`}
                    />
                    <Button
                      size="icon"
                      variant="ghost"
                      className="absolute right-2 top-2"
                      onClick={() =>
                        copyToClipboard(`# My Awesome Project

![GitHub stars](https://img.shields.io/github/stars/yourusername/your-repo?style=social)
![View Count](${createdUrl})

## About

This is my awesome project. Check out how many people have viewed it!

## Features

- Feature 1
- Feature 2
- Feature 3

## Installation

\`\`\`
npm install my-awesome-project
\`\`\`

## Usage

\`\`\`javascript
const myAwesomeProject = require('my-awesome-project');
myAwesomeProject.doSomethingAwesome();
\`\`\`

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.`)
                      }
                    >
                      <ClipboardCopy className="h-4 w-4" />
                      <span className="sr-only">Copy</span>
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          )}
        </CardContent>
        <CardFooter>
          {error && <p className="text-red-500">{error}</p>}
        </CardFooter>
      </Card>
    </div>
  );
}
