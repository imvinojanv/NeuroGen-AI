"use client"

import { useState } from 'react';
import axios from 'axios';
import * as z from 'zod';       // To create our schemes and Validation in our form
import { Music } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

import { Heading } from "@/components/heading";
import { Empty } from '@/components/empty';
import { Loader } from '@/components/loader';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { usePremiumModel } from '@/hooks/use-premium-model';

import { formSchema } from './constants';

const MusicPage = () => {
    const premiumModel = usePremiumModel();

    const router = useRouter();
    const [music, setMusic] = useState<string>();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: ""
        }
    })

    // form has own loading state
    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        
        try {
            setMusic(undefined);
            // Make an API call
            const response = await axios.post("/api/music", values);
            
            setMusic(response.data.audio);
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
    console.log(music);
    

  return (
    <div>
        <Heading 
            title="Music Generation"
            description="Turn your prompt into music."
            icon={Music}
            iconColor="text-emerald-500"
            bgColor="bg-emerald-500/10"
        />

        <div className="px-4 lg:px-8">
            <div>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="
                            rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2
                        "
                    >
                        <FormField
                            name="prompt"
                            render={({ field }) => (
                                <FormItem className='col-span-12 lg:col-span-10'>
                                    <FormControl className='m-0 p-0'>
                                        <Input 
                                            className='border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent'
                                            disabled={isLoading}
                                            placeholder='Piano solo with Drum beets'
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
                    <div className='p-8 rounded-lg w-full flex items-center justify-center bg-muted'>
                        <Loader />
                    </div>
                )}
                {!music && !isLoading && (
                    <Empty 
                        label='No any music generated!'
                    />
                )}
                {music && (
                    <audio controls className='w-full mt-8 rounded-lg'>
                        <source src={music} />
                    </audio>
                )}
            </div>
        </div>
    </div>
  )
}

export default MusicPage