/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Copy, Undo2, RotateCcw, Check } from "lucide-react";
import { API_URL } from "@/lib/utils";
import Cookies from "js-cookie";
import Link from "next/link";

interface Params {
  text: string;
  colorStyle: string;
  icon: string;
  scale: string;
  borderRadius: string;
  fontFamily: string;
  fontSize: string;
  fontWeight: string;
  iconSize: string;
  padding: string;
  gap: string;
  bgColor: string;
  textColor: string;
  iconColor: string;
  viewsBgColor: string;
  viewsColor: string;
  gradientStart: string;
  gradientEnd: string;
  borderColor: string;
}

const defaultParams: Params = {
  text: "Profile Views",
  colorStyle: "1",
  icon: "eye",
  scale: "1",
  borderRadius: "20",
  fontFamily: "Arial, sans-serif",
  fontSize: "14",
  fontWeight: "bold",
  iconSize: "24",
  padding: "12",
  gap: "8",
  bgColor: "",
  textColor: "",
  iconColor: "",
  viewsBgColor: "",
  viewsColor: "",
  gradientStart: "",
  gradientEnd: "",
  borderColor: "",
};

const colorStyles = [
  { value: "1", label: "Blue" },
  { value: "2", label: "Green" },
  { value: "3", label: "Orange" },
  { value: "4", label: "Purple" },
  { value: "5", label: "Pink" },
  { value: "6", label: "Dark Blue" },
  { value: "7", label: "Light Blue" },
  { value: "8", label: "Teal" },
  { value: "9", label: "Light Pink" },
  { value: "10", label: "Brown" },
  { value: "11", label: "Indigo Gradient" },
  { value: "12", label: "Teal Gradient" },
  { value: "13", label: "Pink Gradient" },
  { value: "14", label: "Orange Gradient" },
  { value: "15", label: "Blue Gradient" },
];

const icons = ["eye", "heart", "people", "star", "thumbsUp"];

const sections = [
  { id: "introduction", title: "introduction" },
  { id: "installation", title: "Installation" },
  { id: "parameters", title: "Parameters" },
  { id: "examples", title: "Examples" },
  { id: "customization", title: "Customization" },
];

export default function ViewCounterDocs() {
  const [activeSection, setActiveSection] = useState("introduction");
  const [params, setParams] = useState<Params>(defaultParams);
  const [imageUrl, setImageUrl] = useState("");
  const [history, setHistory] = useState<Params[]>([defaultParams]);
  const [copied, setCopied] = useState(false);
  const getUrl = Cookies.get("token");

  useEffect(() => {
    const changedParams = Object.entries(params).reduce((acc, [key, value]) => {
      if (value !== defaultParams[key as keyof Params] && value !== "") {
        acc[key] = value;
      }
      return acc;
    }, {} as Record<string, string>);

    const queryString = new URLSearchParams(changedParams).toString();
    setImageUrl(`${API_URL}/test${queryString ? `?${queryString}` : ""}`);
  }, [params]);

  const handleChange = (name: string, value: string) => {
    setParams((prev) => {
      const newParams = { ...prev, [name]: value };
      setHistory((prevHistory) => [...prevHistory, newParams]);
      return newParams;
    });
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setParams(defaultParams);
    setHistory([defaultParams]);
  };

  const handleUndo = () => {
    if (history.length > 1) {
      const newHistory = history.slice(0, -1);
      setParams(newHistory[newHistory.length - 1]);
      setHistory(newHistory);
    }
  };

  const CodeBlock = ({ code }: { code: string }) => (
    <div className="relative  ">
      <pre className="bg-muted p-4 rounded-md overflow-x-auto text-sm">
        <code>{code}</code>
      </pre>
      <Button
        variant="outline"
        size="sm"
        className="absolute top-2 right-2"
        onClick={() => handleCopy(code)}
      >
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      </Button>
    </div>
  );

  return (
    <div className="flex flex-col relative lg:flex-row w-full min-h-screen bg-background">
      <aside className="w-full  lg:w-64 lg:fixed sticky left-0 lg:top-14  border-b lg:border-r lg:border-b-0">
        <ScrollArea className="h-full py-6 px-4">
          <h2 className="text-lg font-semibold mb-4">Contents</h2>
          <nav>
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className={`block py-2 px-4 rounded transition-colors ${
                  activeSection === section.id
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted"
                }`}
                onClick={() => setActiveSection(section.id)}
              >
                {section.title}
              </a>
            ))}
          </nav>
        </ScrollArea>
      </aside>

      <main className="flex lg:ml-64  overflow-auto ">
        <div className="container mx-auto py-10 px-4">
          <h1 className="sm:text-4xl text-xl font-bold mb-8">Documentation</h1>

          <section
            id="introduction"
            className="mb-12  scroll-mt-20 tracking-tight "
          >
            <h2 className="sm:text-3xl text-lg font-semibold mb-4">
              Introduction
            </h2>
            <p className="  text-sm sm:text-base">
              The View Counter is a customizable API that allows you to add view
              counts to your web pages, GitHub repositories, or any other online
              content. It provides a visually appealing SVG badge that can be
              easily embedded in your HTML or Markdown.
            </p>
          </section>

          <section id="installation" className="mb-12 scroll-mt-20">
            <h2 className="sm:text-3xl text-lg font-semibold mb-4">
              Installation
            </h2>
            <p className="  text-sm sm:text-base mb-4">
              To use the View Counter, add an image tag to your HTML or
              Markdown:
            </p>
            <CodeBlock
              code={`<img src="${API_URL}/test" alt="View Count" />`}
            />
            {!getUrl && (
              <div className=" my-2">
                <Link href={"/create"}>
                  <Button>Create Counter</Button>
                </Link>
              </div>
            )}
          </section>

          <section id="parameters" className="mb-12 scroll-mt-20">
            <h2 className="sm:text-3xl text-lg  font-semibold mb-4">
              Parameters
            </h2>
            <p className="mb-4 text-sm sm:text-base">
              Customize your counter by adding query parameters to the URL:
            </p>
            <Tabs defaultValue="basic" className="text-sm sm:text-base">
              <TabsList>
                <TabsTrigger value="basic">Basic</TabsTrigger>
                <TabsTrigger value="advanced">Advanced</TabsTrigger>
              </TabsList>
              <TabsContent value="basic">
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>text:</strong> The text to display (default:
                    &apos;&apos;Profile Views&apos;&apos;)
                  </li>
                  <li>
                    <strong>colorStyle:</strong> Choose from predefined color
                    styles (1-15)
                  </li>
                  <li>
                    <strong>icon:</strong> Icon to display (eye, heart, people,
                    star, thumbsUp)
                  </li>
                  <li>
                    <strong>scale:</strong> Scale factor for the badge (default:
                    1)
                  </li>
                  <li>
                    <strong>borderRadius:</strong> Border radius of the badge
                    (default: 20)
                  </li>
                </ul>
              </TabsContent>
              <TabsContent value="advanced">
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>fontFamily:</strong> Font family for the text
                    (default: Arial, sans-serif)
                  </li>
                  <li>
                    <strong>fontSize:</strong> Font size in pixels (default: 14)
                  </li>
                  <li>
                    <strong>fontWeight:</strong> Font weight (default: bold)
                  </li>
                  <li>
                    <strong>iconSize:</strong> Size of the icon in pixels
                    (default: 24)
                  </li>
                  <li>
                    <strong>padding:</strong> Padding inside the badge in pixels
                    (default: 12)
                  </li>
                  <li>
                    <strong>gap:</strong> Gap between elements in pixels
                    (default: 8)
                  </li>
                  <li>
                    <strong>bgColor:</strong> Background color (overrides
                    colorStyle)
                  </li>
                  <li>
                    <strong>textColor:</strong> Text color (overrides
                    colorStyle)
                  </li>
                  <li>
                    <strong>iconColor:</strong> Icon color (overrides
                    colorStyle)
                  </li>
                  <li>
                    <strong>viewsBgColor:</strong> Views background color
                    (overrides colorStyle)
                  </li>
                  <li>
                    <strong>viewsColor:</strong> Views text color (overrides
                    colorStyle)
                  </li>
                  <li>
                    <strong>gradientStart:</strong> Start color for gradient
                    background
                  </li>
                  <li>
                    <strong>gradientEnd:</strong> End color for gradient
                    background
                  </li>
                  <li>
                    <strong>borderColor:</strong> Color of the border (default:
                    same as bgColor)
                  </li>
                </ul>
              </TabsContent>
            </Tabs>
          </section>

          <section id="examples" className="mb-12 scroll-mt-20 ">
            <h2 className="sm:text-3xl text-lg font-semibold mb-4">Examples</h2>
            <div>
              <p className=" mb-3"> Basic Counter</p>
              <CodeBlock
                code={`<img src="${API_URL}/test?text=Profile+Views&icon=eye&colorStyle=3" alt="View Count" />`}
              />

              <img
                src={`${API_URL}/test?text=Profile+Views&icon=eye&colorStyle=3`}
                alt="View Count"
                className=" my-3"
              />
            </div>
          </section>

          <section id="customization" className="mb-12 scroll-mt-20">
            <h2 className="sm:text-3xl text-lg font-semibold mb-4">
              Customization
            </h2>
            <p className="mb-4 text-sm sm:text-base">
              Adjust various parameters to create a counter that matches your
              brand and design.
            </p>
            <div className="relative flex flex-col lg:flex-row gap-8">
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(params).map(([key, value]) => {
                  return (
                    <div key={key}>
                      <Label htmlFor={key}>{key}</Label>
                      {key === "colorStyle" || key === "icon" ? (
                        <Select
                          value={value}
                          onValueChange={(newValue) =>
                            handleChange(key, newValue)
                          }
                        >
                          <SelectTrigger id={key}>
                            <SelectValue placeholder={`Select ${key}`} />
                          </SelectTrigger>
                          <SelectContent>
                            <div className="grid grid-cols-2 gap-4">
                              {(key === "colorStyle" ? colorStyles : icons).map(
                                (item) => {
                                  if (typeof item === "string") {
                                    return (
                                      <SelectItem key={item} value={item}>
                                        {item}
                                      </SelectItem>
                                    );
                                  } else {
                                    return (
                                      <SelectItem
                                        key={item.value}
                                        value={item.value}
                                      >
                                        {item.label}
                                      </SelectItem>
                                    );
                                  }
                                }
                              )}
                            </div>
                          </SelectContent>
                        </Select>
                      ) : (
                        <Input
                          id={key}
                          type={
                            [
                              "scale",
                              "borderRadius",
                              "fontSize",
                              "iconSize",
                              "padding",
                              "gap",
                            ].includes(key)
                              ? "number"
                              : "text"
                          }
                          value={value}
                          onChange={(e) => handleChange(key, e.target.value)}
                        />
                      )}
                    </div>
                  );
                })}
              </div>

              <div className=" sm:w-96 ">
                {imageUrl && (
                  <div className="lg:sticky  lg:top-16 lg:self-start flex-shrink-0   ">
                    <h2 className="sm:text-3xl text-lg font-semibold mb-4">
                      Live Preview
                    </h2>
                    <div className="bg-muted p-4 rounded-lg">
                      <img
                        src={imageUrl}
                        alt="Preview"
                        className="mb-4 mx-auto"
                      />
                      <CodeBlock code={imageUrl} />
                    </div>
                  </div>
                )}
                <div className="mt-6 flex flex-wrap gap-4">
                  <Button onClick={() => handleCopy(imageUrl)} className="">
                    {copied ? (
                      <Check className="h-4 w-4 mr-2" />
                    ) : (
                      <Copy className="h-4 w-4 mr-2 " />
                    )}
                    Copy URL
                  </Button>
                  <Button onClick={handleClear}>
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Clear All
                  </Button>
                  <Button onClick={handleUndo} disabled={history.length <= 1}>
                    <Undo2 className="h-4 w-4 mr-2" />
                    Undo
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
