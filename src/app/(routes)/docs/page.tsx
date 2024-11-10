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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Server } from "@/app/page";

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
  { id: "introduction", title: "Introduction" },
  { id: "installation", title: "Installation" },
  { id: "parameters", title: "Parameters" },
  { id: "examples", title: "Examples" },
  { id: "customization", title: "Customization" },
  { id: "api-reference", title: "API Reference" },
];

export default function Docs() {
  const [activeSection, setActiveSection] = useState("introduction");

  const [params, setParams] = useState({
    text: "Profile Views",
    colorStyle: "1",
    icon: "eye",
    scale: "1",
    borderRadius: "20",
    fontFamily: "Arial, sans-serif",
    fontSize: "14",
    fontWeight: "bold",
    padding: "12",
    gap: "8",
    bgColor: "",
    textColor: "",
    iconColor: "",
    viewsBgColor: "",
    viewsColor: "",
    gradientStart: "",
    gradientEnd: "",
  });

  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const queryString = new URLSearchParams(params).toString();
    setImageUrl(`${Server}/test?${queryString}`);
  }, [params]);

  const handleChange = (name: string, value: string) => {
    setParams((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex min-h-screen w-screen relative ">
      {/* Sidebar */}
      <aside className="w-[15%] bg-gray-100 p-6 fixed left-0 top-12 h-full">
        <h2 className="text-2xl font-bold mb-4">Contents</h2>
        <nav>
          <ul>
            {sections.map((section) => (
              <li key={section.id} className="mb-2">
                <a
                  href={`#${section.id}`}
                  className={`block p-2 rounded ${
                    activeSection === section.id
                      ? "bg-blue-500 text-white"
                      : "hover:bg-gray-200"
                  }`}
                  onClick={() => setActiveSection(section.id)}
                >
                  {section.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8  ml-[15%] w-[80%]">
        <h1 className="text-4xl font-bold mb-8">View Counter Documentation</h1>

        <section id="introduction" className="mb-12">
          <h2 className="text-3xl font-semibold mb-4">Introduction</h2>
          <p>
            The View Counter is a customizable API that allows you to add view
            counts to your web pages, GitHub repositories, or any other online
            content. It provides a visually appealing SVG badge that can be
            easily embedded in your HTML or Markdown.
          </p>
        </section>

        <section id="installation" className="mb-12">
          <h2 className="text-3xl font-semibold mb-4">Installation</h2>
          <p className="mb-4">
            To use the View Counter, simply add an image tag to your HTML or
            Markdown with the following URL:
          </p>
          <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
            <code>{`<img src="${Server}/test" alt='View Count' />`}</code>
          </pre>
        </section>

        <section id="parameters" className="mb-12">
          <h2 className="text-3xl font-semibold mb-4">Parameters</h2>
          <p className="mb-4">
            Customize your counter by adding query parameters to the URL. Here
            {"'"}s a list of available parameters:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>text:</strong> The text to display (default:{" "}
              {"Profile Views"})
            </li>
            <li>
              <strong>colorStyle:</strong> Choose from predefined color styles
              (1-15)
            </li>
            <li>
              <strong>icon:</strong> Icon to display (eye, heart, people, star,
              thumbsUp)
            </li>
            <li>
              <strong>scale:</strong> Scale factor for the badge (default: 1)
            </li>
            <li>
              <strong>borderRadius:</strong> Border radius of the badge
              (default: 20)
            </li>
            <li>
              <strong>fontFamily:</strong> Font family for the text (default:
              {"Arial, sans-serif"})
            </li>
            <li>
              <strong>fontSize:</strong> Font size in pixels (default: 14)
            </li>
            <li>
              <strong>fontWeight:</strong> Font weight (default: {"bold"})
            </li>
            <li>
              <strong>padding:</strong> Padding inside the badge in pixels
              (default: 12)
            </li>
            <li>
              <strong>gap:</strong> Gap between elements in pixels (default: 8)
            </li>
            <li>
              <strong>bgColor:</strong> Background color (overrides colorStyle)
            </li>
            <li>
              <strong>textColor:</strong> Text color (overrides colorStyle)
            </li>
            <li>
              <strong>iconColor:</strong> Icon color (overrides colorStyle)
            </li>
            <li>
              <strong>viewsBgColor:</strong> Views background color (overrides
              colorStyle)
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
              <strong>gradientEnd:</strong> End color for gradient background
            </li>
          </ul>
        </section>

        <section id="examples" className="mb-12">
          <h2 className="text-3xl font-semibold mb-4">Examples</h2>
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Default</CardTitle>
              </CardHeader>
              <CardContent>
                <img src={`${Server}/test`} alt="Default example" />
                <pre className="bg-gray-100 p-2 rounded-md mt-2 overflow-x-auto">
                  <code>{`${Server}/test`}</code>
                </pre>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Custom Text and Color</CardTitle>
              </CardHeader>
              <CardContent>
                <img
                  src={`${Server}/test?text=Total%20Visits&colorStyle=7`}
                  alt="Custom text and color example"
                />
                <pre className="bg-gray-100 p-2 rounded-md mt-2 overflow-x-auto">
                  <code>
                    {`${Server}/test?text=Total%20Visits&colorStyle=7`}
                  </code>
                </pre>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Custom Icon and Scale</CardTitle>
              </CardHeader>
              <CardContent>
                <img
                  src={`${Server}/test?icon=heart&scale=1.2`}
                  alt="Custom icon and scale example"
                />
                <pre className="bg-gray-100 p-2 rounded-md mt-2 overflow-x-auto">
                  <code>{`${Server}/test?icon=heart&scale=1.2`}</code>
                </pre>
              </CardContent>
            </Card>
          </div>
        </section>

        <section id="customization" className="mb-12">
          <h2 className="text-3xl font-semibold mb-4">Customization</h2>
          <div className="space-y-4">
            <Label>Text</Label>
            <Input
              type="text"
              value={params.text}
              onChange={(e) => handleChange("text", e.target.value)}
            />

            <Label>Color Style</Label>
            <Select
              onValueChange={(value) => handleChange("colorStyle", value)}
              value={params.colorStyle}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select color style" />
              </SelectTrigger>
              <SelectContent>
                {colorStyles.map((style) => (
                  <SelectItem key={style.value} value={style.value}>
                    {style.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Label>Icon</Label>
            <Select
              onValueChange={(value) => handleChange("icon", value)}
              value={params.icon}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select icon" />
              </SelectTrigger>
              <SelectContent>
                {icons.map((icon) => (
                  <SelectItem key={icon} value={icon}>
                    {icon}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Label>Scale</Label>
            <Input
              type="number"
              value={params.scale}
              onChange={(e) => handleChange("scale", e.target.value)}
            />

            <Label>Border Radius</Label>
            <Input
              type="number"
              value={params.borderRadius}
              onChange={(e) => handleChange("borderRadius", e.target.value)}
            />
          </div>

          <Button
            className="mt-4"
            onClick={() =>
              setImageUrl(`${Server}/test?${new URLSearchParams(params)}`)
            }
          >
            Update Preview
          </Button>

          {imageUrl && (
            <div className="mt-6">
              <img src={imageUrl} alt="Preview" />
              <pre className="bg-gray-100 p-2 rounded-md mt-2 overflow-x-auto">
                <code>{imageUrl}</code>
              </pre>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
