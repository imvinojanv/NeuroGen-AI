"use client"

import { useState } from 'react';
import axios from 'axios';
import * as z from 'zod';       // To create our schemes and Validation in our form
import { Download, ImageIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { toast } from 'react-hot-toast';

import { Heading } from "@/components/heading";
import { Empty } from '@/components/empty';
import { Loader } from '@/components/loader';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardFooter } from '@/components/ui/card';
import { usePremiumModel } from '@/hooks/use-premium-model';

import { amountOptions, formSchema, resolutionOptions } from './constants';

const ImagePage = () => {
    const premiumModel = usePremiumModel();

    const router = useRouter();
    const [images, setImages] = useState<string[]>([]);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: "",
            amount: "1",
            resolution: "512x512"
        }
    })

    // form has own loading state
    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setImages([]);
            console.log(values);

            // Make an API call
            const response = await axios.post("/api/image", values);

            const urls = response.data.map((image: { url: string }) => image.url);
            setImages(urls);
            
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
            title="Image Generation"
            description="Turn your propt into an image."
            icon={ImageIcon}
            iconColor="text-pink-700"
            bgColor="bg-pink-700/10"
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
                                <FormItem className='col-span-12 lg:col-span-6'>
                                    <FormControl className='m-0 p-0'>
                                        <Input 
                                            className='border-0 bg-[#202025] outline-none focus-visible:ring-0 focus-visible:ring-transparent'
                                            disabled={isLoading}
                                            placeholder='A picture of a horse in Swiss alps'
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="amount"
                            render={({ field }) => (
                                <FormItem className='col-span-12 lg:col-span-2'>
                                    <Select
                                        disabled={isLoading}
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue defaultValue={field.value} />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {amountOptions.map((option) => (
                                                <SelectItem
                                                    key={option.value}
                                                    value={option.value}
                                                >
                                                    {option.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="resolution"
                            render={({ field }) => (
                                <FormItem className='col-span-12 lg:col-span-2'>
                                    <Select
                                        disabled={isLoading}
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue defaultValue={field.value} />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {resolutionOptions.map((option) => (
                                                <SelectItem
                                                    key={option.value}
                                                    value={option.value}
                                                >
                                                    {option.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
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
                    <div className='p-20'>
                        <Loader />
                    </div>
                )}
                {images.length === 0 && !isLoading && (
                    <Empty 
                        label='No any Images generated yet!'
                    />
                )}
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8'>
                    {images.map((src) => (
                        <Card
                            key={src}
                            className="rounded-lg overflow-hidden bg-[#202025] border-[rgba(56,56,58,.6)]"
                        >
                            <div className='relative aspect-square'>
                                <Image 
                                    alt='Image'
                                    fill
                                    src={src}
                                />
                            </div>
                            <CardFooter className='p-2'>
                                <Button 
                                    variant="secondary" 
                                    className='w-full bg-[#171719] border border-[rgba(56,56,58,.6)] hover:border-white/50 hover:bg-[#171719] text-white'
                                    onClick={() => window.open(src)}
                                >
                                    <Download className='h-4 w-4 mr-2' />
                                    Download
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    </div>
  )
}

export default ImagePage