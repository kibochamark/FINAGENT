// "use client"

// import type React from "react"

// import { useState } from "react"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Card, CardContent } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Textarea } from "@/components/ui/textarea"
// import { Label } from "@/components/ui/label"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// import { Loader2, Upload, Link, FileText, Check, AlertCircle } from "lucide-react"
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
// import { toast } from "sonner"

// export function DataIngestion() {
  
//   const [isLoading, setIsLoading] = useState(false)
//   const [status, setStatus] = useState<"idle" | "success" | "error">("idle")
//   const [directText, setDirectText] = useState("")
//   const [url, setUrl] = useState("")
//   const [category, setCategory] = useState("")
//   const [source, setSource] = useState("")
//   const [selectedFile, setSelectedFile] = useState<File | null>(null)

//   const handleSubmit = async (type: "text" | "file" | "url") => {
//     setIsLoading(true)
//     setStatus("idle")

//     // Simulate API call
//     try {
//       await new Promise((resolve) => setTimeout(resolve, 1500))

//       // Success simulation
//       setStatus("success")
  
//       toast.success("Data ingested successfully" + `Your ${type} data has been added to the vector store.`)

//       // Reset form based on type
//       if (type === "text") setDirectText("")
//       else if (type === "url") setUrl("")
//       else if (type === "file") setSelectedFile(null)
//     } catch () {
//       setStatus("error")
//       toast.error("Error ingesting data" + "There was a problem adding your data to the vector store.")
      
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       setSelectedFile(e.target.files[0])
//     }
//   }

//   return (
//     <Card className="w-full">
//       <CardContent className="pt-6">
//         <Tabs defaultValue="text">
//           <TabsList className="grid w-full grid-cols-3">
//             <TabsTrigger value="text">Direct Text</TabsTrigger>
//             <TabsTrigger value="file">File Upload</TabsTrigger>
//             <TabsTrigger value="url">URL</TabsTrigger>
//           </TabsList>

//           {/* Direct Text Input */}
//           <TabsContent value="text">
//             <div className="space-y-4 mt-4">
//               <div>
//                 <Label htmlFor="direct-text">Enter Text Content</Label>
//                 <Textarea
//                   id="direct-text"
//                   placeholder="Paste or type your text content here..."
//                   className="min-h-[200px] mt-1"
//                   value={directText}
//                   onChange={(e) => setDirectText(e.target.value)}
//                 />
//               </div>

//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <Label htmlFor="text-source">Source (Optional)</Label>
//                   <Input
//                     id="text-source"
//                     placeholder="e.g., Book, Article, Notes"
//                     className="mt-1"
//                     value={source}
//                     onChange={(e) => setSource(e.target.value)}
//                   />
//                 </div>
//                 <div>
//                   <Label htmlFor="text-category">Category (Optional)</Label>
//                   <Select value={category} onValueChange={setCategory}>
//                     <SelectTrigger id="text-category" className="mt-1">
//                       <SelectValue placeholder="Select category" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="general">General</SelectItem>
//                       <SelectItem value="technical">Technical</SelectItem>
//                       <SelectItem value="business">Business</SelectItem>
//                       <SelectItem value="academic">Academic</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>
//               </div>

//               <Button
//                 className="w-full"
//                 onClick={() => handleSubmit("text")}
//                 disabled={isLoading || !directText.trim()}
//               >
//                 {isLoading ? (
//                   <>
//                     <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                     Processing...
//                   </>
//                 ) : (
//                   <>
//                     <FileText className="mr-2 h-4 w-4" />
//                     Add Text to Vector Store
//                   </>
//                 )}
//               </Button>
//             </div>
//           </TabsContent>

//           {/* File Upload */}
//           <TabsContent value="file">
//             <div className="space-y-4 mt-4">
//               <div className="border-2 border-dashed rounded-lg p-6 text-center">
//                 <Input
//                   id="file-upload"
//                   type="file"
//                   className="hidden"
//                   accept=".txt,.csv,.md,.json"
//                   onChange={handleFileChange}
//                 />
//                 <Label htmlFor="file-upload" className="flex flex-col items-center justify-center cursor-pointer">
//                   <Upload className="h-10 w-10 text-gray-400 mb-2" />
//                   <span className="text-sm font-medium">
//                     {selectedFile ? selectedFile.name : "Click to upload or drag and drop"}
//                   </span>
//                   <span className="text-xs text-gray-500 mt-1">Supports .txt, .csv, .md, .json</span>
//                 </Label>
//               </div>

//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <Label htmlFor="file-source">Source (Optional)</Label>
//                   <Input
//                     id="file-source"
//                     placeholder="e.g., Report, Dataset"
//                     className="mt-1"
//                     value={source}
//                     onChange={(e) => setSource(e.target.value)}
//                   />
//                 </div>
//                 <div>
//                   <Label htmlFor="file-category">Category (Optional)</Label>
//                   <Select value={category} onValueChange={setCategory}>
//                     <SelectTrigger id="file-category" className="mt-1">
//                       <SelectValue placeholder="Select category" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="general">General</SelectItem>
//                       <SelectItem value="technical">Technical</SelectItem>
//                       <SelectItem value="business">Business</SelectItem>
//                       <SelectItem value="academic">Academic</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>
//               </div>

//               <Button className="w-full" onClick={() => handleSubmit("file")} disabled={isLoading || !selectedFile}>
//                 {isLoading ? (
//                   <>
//                     <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                     Uploading...
//                   </>
//                 ) : (
//                   <>
//                     <Upload className="mr-2 h-4 w-4" />
//                     Upload File to Vector Store
//                   </>
//                 )}
//               </Button>
//             </div>
//           </TabsContent>

//           {/* URL Input */}
//           <TabsContent value="url">
//             <div className="space-y-4 mt-4">
//               <div>
//                 <Label htmlFor="url-input">Enter URL</Label>
//                 <Input
//                   id="url-input"
//                   placeholder="https://example.com/article"
//                   className="mt-1"
//                   value={url}
//                   onChange={(e) => setUrl(e.target.value)}
//                 />
//               </div>

//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <Label htmlFor="url-source">Source (Optional)</Label>
//                   <Input
//                     id="url-source"
//                     placeholder="e.g., Website, Blog"
//                     className="mt-1"
//                     value={source}
//                     onChange={(e) => setSource(e.target.value)}
//                   />
//                 </div>
//                 <div>
//                   <Label htmlFor="url-category">Category (Optional)</Label>
//                   <Select value={category} onValueChange={setCategory}>
//                     <SelectTrigger id="url-category" className="mt-1">
//                       <SelectValue placeholder="Select category" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="general">General</SelectItem>
//                       <SelectItem value="technical">Technical</SelectItem>
//                       <SelectItem value="business">Business</SelectItem>
//                       <SelectItem value="academic">Academic</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>
//               </div>

//               <Button className="w-full" onClick={() => handleSubmit("url")} disabled={isLoading || !url.trim()}>
//                 {isLoading ? (
//                   <>
//                     <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                     Fetching...
//                   </>
//                 ) : (
//                   <>
//                     <Link className="mr-2 h-4 w-4" />
//                     Fetch URL Content to Vector Store
//                   </>
//                 )}
//               </Button>
//             </div>
//           </TabsContent>
//         </Tabs>

//         {/* Status messages */}
//         {status === "success" && (
//           <Alert className="mt-4 bg-green-50 border-green-200">
//             <Check className="h-4 w-4 text-green-600" />
//             <AlertTitle className="text-green-800">Success</AlertTitle>
//             <AlertDescription className="text-green-700">
//               Your data has been successfully added to the vector store.
//             </AlertDescription>
//           </Alert>
//         )}

//         {status === "error" && (
//           <Alert className="mt-4 bg-red-50 border-red-200" variant="destructive">
//             <AlertCircle className="h-4 w-4" />
//             <AlertTitle>Error</AlertTitle>
//             <AlertDescription>There was a problem adding your data. Please try again.</AlertDescription>
//           </Alert>
//         )}
//       </CardContent>
//     </Card>
//   )
// }
