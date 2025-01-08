import { NextResponse } from 'next/server'

export interface ResponseData {
    model: string
    created_at: string
    response: string
    done: boolean
    done_reason: string
    context: string
    total_duration: number
    load_duration: number
    prompt_eval_duration: number
    eval_count: number
    eval_duration: number
}

export async function POST(req: Request) {
    try {
        const formData = await req.formData()
        const file = formData.get('file') as Blob

        if (!file) {
            return NextResponse.json(
                { error: 'File is required' },
                { status: 400 }
            )
        }

        // Convert the file to a base64-encoded string
        const fileArrayBuffer = await file.arrayBuffer()
        const base64Image = Buffer.from(fileArrayBuffer).toString('base64')

        // Prepare the payload
        const payload = {
            model: 'minicpm-v',
            prompt: 'Analyze the image and provide a concise response.',
            stream: false,
            images: [base64Image],
        }

        // Send the request to the local Ollama instance
        const response = await fetch('http://localhost:11434/api/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })

        if (!response.ok) {
            const error = await response.text()
            return NextResponse.json({ error }, { status: response.status })
        }

        const result: ResponseData = await response.json()
        return NextResponse.json({ result })
    } catch (error) {
        console.error(error)
        return NextResponse.json(
            { error: 'An unexpected error occurred' },
            { status: 500 }
        )
    }
}
