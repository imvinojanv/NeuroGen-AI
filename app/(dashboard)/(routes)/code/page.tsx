"use client"

import { useState } from 'react';
import axios from 'axios';
import * as z from 'zod';       // To create our schemes and Validation in our form
import { Code } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { ChatCompletionRequestMessage } from 'openai';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { toast } from 'react-hot-toast';

import { Heading } from "@/components/heading";
import { Empty } from '@/components/empty';
import { Loader } from '@/components/loader';
import { UserAvatar } from '@/components/user-avatar';
import { BotAvatar } from '@/components/bot-avatar';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { usePremiumModel } from '@/hooks/use-premium-model';

import { formSchema } from './constants';

const CodePage = () => {
    const premiumModel = usePremiumModel();

    const router = useRouter();
    const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: ""
        }
    })

    // form has own loading state
    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(values);
        try {
            const userMessage: ChatCompletionRequestMessage = {
                role: 'user',
                content: values.prompt,
            };
            const newMessages = [...messages, userMessage];

            // Make an API call
            const response = await axios.post("/api/code", {
                messages: newMessages,
            });
            setMessages((current) => [...current, userMessage, response.data])

            // To clear the input field
            form.reset();
        } catch (error: any) {
            if (error?.response?.status === 403) {
                premiumModel.onOpen();
            } else {
                toast.error("Something went wrong!");
            }
            console.log(error);
        } finally {
            router.refresh();
        }
    };

  return (
    <div>
        <Heading 
            title="Code Generation"
            description="Generate code using descriptive text."
            icon={Code}
            iconColor="text-green-700"
            bgColor="bg-green-700/10"
        />

        <div className="px-4 lg:px-8">
            <div>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="
                            rounded-lg border border-[rgba(56,56,58,.6)] bg-[#202025] w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2
                        "
                    >
                        <FormField
                            name="prompt"
                            render={({ field }) => (
                                <FormItem className='col-span-12 lg:col-span-10'>
                                    <FormControl className='m-0 p-0'>
                                        <Input 
                                            className='border-0 bg-[#202025] outline-none focus-visible:ring-0 focus-visible:ring-transparent'
                                            disabled={isLoading}
                                            placeholder='Simple toggle button using react hooks.'
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <Button className='col-span-12 lg:col-span-2 w-full' disabled={isLoading}>
                            Generate
                        </Button>
                    </form>
                </Form>
            </div>
            
            <div className='space-y-4 mt-4'>
                {isLoading && (
                    <div className='p-8 rounded-lg w-full flex items-center justify-center bg-[#202025]'>
                        <Loader />
                    </div>
                )}
                {messages.length === 0 && !isLoading && (
                    <Empty 
                        label='No any conversation is started yet!'
                    />
                )}
                <div className='flex flex-col-reverse gap-y-4'>
                    {messages.map((message) => (
                        <div 
                            key={message.content}
                            className={cn(
                                "p-8 w-full flex items-start gap-x-8 rounded-lg",
                                message.role === "user" ? "border border-[rgba(56,56,58,.6)]" : "bg-[#202025]"
                            )}
                        >
                            {message.role === "user" ? <UserAvatar /> : <BotAvatar />}
                            <ReactMarkdown
                                components={{
                                    // For Snippet box
                                    pre: ({ node, ...props }) => (
                                        <div className='overflow-auto w-full my-2 bg-[#171719] border border-[rgba(56,56,58,.6)] p-4 rounded-lg'>
                                            <pre {...props} />
                                        </div>
                                    ),
                                    // For code words
                                    code: ({ node, ...props }) => (
                                        <code className='bg-[#171719] border border-[rgba(56,56,58,.6)] rounded-lg py-1 px-2' {...props} />
                                    )
                                }}
                                className='text-md overflow-hidden leading-7'
                            >
                                {message.content || ""}
                            </ReactMarkdown>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
  )
}

export default CodePage