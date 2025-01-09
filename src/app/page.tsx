'use client'

import { useState } from 'react'
import { FileUpload } from '../components/file-upload'
import { OllamaResponse } from './api/process-file/route'

export default function Home() {
    const [fileContent, setFileContent] = useState<OllamaResponse | null>(null)

    const handleFileSelect = (res: OllamaResponse) => {
        setFileContent(res)
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24">
            <h1 className="text-4xl font-bold mb-8">File Upload Demo</h1>
            <div className="w-full max-w-md mb-8">
                <FileUpload onProcessingComplete={handleFileSelect} />
            </div>
            {fileContent && (
                <div className="w-full max-w-md p-4 bg-gray-100 rounded shadow">
                    <h2 className="text-2xl font-semibold mb-4">
                        File Content
                    </h2>
                    <pre className="text-sm overflow-auto">
                        {fileContent.response}
                    </pre>
                </div>
            )}
        </main>
    )
}
