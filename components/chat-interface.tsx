"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Bold, Italic, Underline, ChevronDown, Send, Loader2 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { useMobile } from "@/hooks/use-mobile"
import {useFormik}  from 'formik'
import { useMutation } from "@tanstack/react-query"
import * as Yup from 'yup'
import { queryagent } from "@/actions/queryagent"

// Define message types


export function ChatInterface({history}:{
  history:{
    status:number,
    history:{
      query:string;
      response:string;
      created_at:Date;
      updated_at:Date;
    }[]
  }[]
}) {
  const isMobile = useMobile()


  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Text formatting state
  const [formatting, setFormatting] = useState({
    fontFamily: "sans-serif",
    fontSize: "medium",
    isBold: false,
    isItalic: false,
    isUnderlined: false,
    color: "#000000",
  })

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [history])





  //   our editor



  const toggleFormatting = (type: "bold" | "italic" | "underline") => {
    setFormatting((prev) => ({
      ...prev,
      isBold: type === "bold" ? !prev.isBold : prev.isBold,
      isItalic: type === "italic" ? !prev.isItalic : prev.isItalic,
      isUnderlined: type === "underline" ? !prev.isUnderlined : prev.isUnderlined,
    }))
  }

  const setFontFamily = (font: string) => {
    setFormatting((prev) => ({ ...prev, fontFamily: font }))
  }

  const setFontSize = (size: string) => {
    setFormatting((prev) => ({ ...prev, fontSize: size }))
  }

  const setTextColor = (color: string) => {
    setFormatting((prev) => ({ ...prev, color }))
  }


  //   end of editor

  const querymutation = useMutation({
    mutationFn:async(query:string)=>{
      const res = await queryagent(query)
      return res
    },
    onSuccess(data) {
      console.log(JSON.stringify(data));
      
    },
    onError(error) {
      console.log(JSON.stringify(error));
    },
  })

  const formik =useFormik({
    initialValues:{
      query:''
    },
    validationSchema:Yup.object().shape({
      query:Yup.string().required("Query is required")
    }),
    onSubmit(values) {
      
      formik.setSubmitting(false)

      querymutation.mutateAsync(values.query)
      
    },
  })

  return (
    <Card className="w-full h-[calc(100vh-180px)] md:h-[calc(100vh-160px)] flex flex-col">
      <CardContent className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          <div className={`flex justify-start`}>
            <div
              className={`max-w-[80%] rounded-lg p-3 bg-muted`}

            >
              Hello! Im your AI assistant. You can ask me questions about the data you ve added to the vector store.

              <div
                className={`text-xs mt-1 text-muted-foreground`}
              >
                {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </div>
            </div>
          </div>
          {history && Array.isArray(history[1]) && history[1].map((result:{
            query:string;
            response:string;
            created_at:Date;
            updated_at:Date;
          }, idx:number) => (
            <>
            {/* query  */}
                 <div key={idx} className={`flex justify-end`}>
              <div
                className={`max-w-[80%] rounded-lg p-3 bg-purple-700 text-white`}
                
              >
                {result.query}
                <div
                  className={`text-xs mt-1 text-black`}
                >
                  {new Date(result.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </div>
              </div>
            </div>

            {/* response from agent */}

            <div key={idx} className={`flex justify-start`}>
              <div
                className={`max-w-[80%] rounded-lg p-3 bg-gray-200 text-black`}
                
              >
                {result.response}
                <div
                  className={`text-xs mt-1 text-black`}
                >
                  {new Date(result.updated_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </div>
              </div>
            </div>
            </>
       
          ))}
          {querymutation.isPending && (
            <div className="flex justify-start">
              <div className="bg-muted rounded-lg p-3">
                <div className="flex items-center space-x-1">
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  ></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </CardContent>

      <CardFooter className="border-t p-4">
        <div className="w-full space-y-2">
          {/* Text formatting toolbar */}
          <div className="flex items-center space-x-2 pb-2">
            {/* Font Family */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-8">
                  <span className="mr-1 text-xs">Font</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem onClick={() => setFontFamily("sans-serif")}>
                  <span style={{ fontFamily: "sans-serif" }}>Sans-serif</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFontFamily("serif")}>
                  <span style={{ fontFamily: "serif" }}>Serif</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFontFamily("monospace")}>
                  <span style={{ fontFamily: "monospace" }}>Monospace</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFontFamily("Arial")}>
                  <span style={{ fontFamily: "Arial" }}>Arial</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFontFamily("Times New Roman")}>
                  <span style={{ fontFamily: "Times New Roman" }}>Times New Roman</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Font Size */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-8">
                  <span className="mr-1 text-xs">Size</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem onClick={() => setFontSize("small")}>
                  <span className="text-sm">Small</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFontSize("medium")}>
                  <span className="text-base">Medium</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFontSize("large")}>
                  <span className="text-lg">Large</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Separator orientation="vertical" className="h-8" />

            {/* Text formatting buttons */}
            <Button
              variant={formatting.isBold ? "default" : "outline"}
              size="icon"
              className="h-8 w-8"
              onClick={() => toggleFormatting("bold")}
            >
              <Bold className="h-4 w-4" />
            </Button>
            <Button
              variant={formatting.isItalic ? "default" : "outline"}
              size="icon"
              className="h-8 w-8"
              onClick={() => toggleFormatting("italic")}
            >
              <Italic className="h-4 w-4" />
            </Button>
            <Button
              variant={formatting.isUnderlined ? "default" : "outline"}
              size="icon"
              className="h-8 w-8"
              onClick={() => toggleFormatting("underline")}
            >
              <Underline className="h-4 w-4" />
            </Button>

            <Separator orientation="vertical" className="h-8" />

            {/* Color picker */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 px-2">
                  <div className="w-4 h-4 rounded-full mr-1" style={{ backgroundColor: formatting.color }} />
                  <span className="text-xs">Color</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-64" align="start">
                <div className="grid grid-cols-5 gap-2">
                  {[
                    "#000000",
                    "#FF0000",
                    "#00FF00",
                    "#0000FF",
                    "#FFFF00",
                    "#FF00FF",
                    "#00FFFF",
                    "#800000",
                    "#008000",
                    "#000080",
                    "#808000",
                    "#800080",
                    "#008080",
                    "#808080",
                    "#FF8080",
                    "#80FF80",
                    "#8080FF",
                    "#FFFF80",
                    "#FF80FF",
                    "#80FFFF",
                  ].map((color) => (
                    <button
                      key={color}
                      className="w-8 h-8 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                      style={{ backgroundColor: color }}
                      onClick={() => setTextColor(color)}
                    />
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          </div>

          {/* Message input */}
          <div className="flex space-x-2">
            <form onSubmit={formik.handleSubmit} className="w-full">
              {formik.errors.query && formik.touched.query && (
                <div className="text-red-600 text-md">{formik.errors.query}</div>
              )}
              <Input
                value={formik.values.query}
                name="query"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Type your message..."
                className="flex-1"
                style={{
                  fontFamily: formatting.fontFamily,
                  fontSize:
                    formatting.fontSize === "small" ? "0.875rem" : formatting.fontSize === "large" ? "1.25rem" : "1rem",
                  fontWeight: formatting.isBold ? "bold" : "normal",
                  fontStyle: formatting.isItalic ? "italic" : "normal",
                  textDecoration: formatting.isUnderlined ? "underline" : "none",
                  color: formatting.color,
                }}
              />
              <Button
                type="submit"
disabled={formik.isSubmitting || querymutation.isPending}
                size={isMobile ? "icon" : "default"}
                className="disabled:bg-gray-600"
              >
                {querymutation.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    {!isMobile && "Send"}
                    <Send className={`h-4 w-4 ${isMobile ? "" : "ml-2"}`} />
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
