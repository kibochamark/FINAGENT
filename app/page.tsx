import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { ChatInterface } from "@/components/chat-interface"

import { gethistory } from "@/actions/queryagent"

export default async function Home() {
  const history = await gethistory() ?? []
  return (
    <main className="flex flex-col min-h-screen bg-gray-50">
      <header className="border-b bg-white p-4">
        <h1 className="text-2xl font-bold">Vector Store & Chat Application</h1>
      </header>

      <div className="flex flex-col md:flex-row flex-1 p-4 gap-6">
        {/* Mobile tabs for responsive design */}
        <Tabs defaultValue="data" className="w-full md:hidden">
          <TabsList className="grid w-full grid-cols-2">
            {/* <TabsTrigger value="data">Data Ingestion</TabsTrigger> */}
            <TabsTrigger value="chat">Chat</TabsTrigger>
          </TabsList>
          {/* <TabsContent value="data" className="mt-4">
            <DataIngestion />
          </TabsContent> */}
          <TabsContent value="chat" className="mt-4">
            <ChatInterface history={history} />
          </TabsContent>
        </Tabs>

        {/* Desktop layout */}
        <div className="hidden md:flex flex-1 gap-6">
          {/* <div className="w-2/5">
            <h2 className="text-xl font-semibold mb-4">Data Ingestion</h2>
            <DataIngestion />
          </div> */}
          <div className="w-3/5">
            <h2 className="text-xl font-semibold mb-4">Chat Interface</h2>
            <ChatInterface history={history}/>
          </div>
        </div>
      </div>
    </main>
  )
}
