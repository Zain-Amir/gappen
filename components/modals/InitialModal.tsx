"use client"
import {Dialog,DialogContent,DialogDescription,DialogFooter,DialogHeader,DialogTitle} from "@/components/ui/dialog"
import { Form , FormControl,FormField,FormItem,FormLabel, FormMessage} from "@/components/ui/form"
import { Input} from "@/components/ui/input"
import { Button} from "@/components/ui/button"
import {useForm} from "react-hook-form"
import * as z from "zod"
import {zodResolver} from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { FileUpload } from "@/components/file-upload"
import axios from "axios"
import { useRouter } from "next/navigation"

const formSchema = z.object({
        name:z.string().min(1,{message:"Not gonna name your server?"}),
        imageUrl: z.string().min(1,{message:"Dont have a cool image?"})
    })


export const InitialModal = ()=>{
     const form = useForm({
        resolver:zodResolver(formSchema),
        defaultValues:{
            name: "",
            imageUrl:"",
        }
     })
    const router = useRouter()
     const isLoading = form.formState.isSubmitting
    const onSubmit = async(values:z.infer<typeof formSchema> )=>{
     try {
      await axios.post("/api/servers",values)
      form.reset()
      router.refresh()
      window.location.reload()
     } catch (error) {
      console.log(error)
     }
    }
const [isMounted,setMounted] = useState(false)
useEffect(()=>{
    setMounted(true)
},[])

if (!isMounted) {return null}

    return (
        <Dialog open>
            <DialogContent className="bg-blue-100 text-black p-0 overflow-hidden gap-3">
                <DialogHeader className="pt-8 px-6 ">
                    <DialogTitle className="text-2xl text-center font-bold">PumpUp the servers!</DialogTitle>    
                </DialogHeader>                
                <DialogDescription className="text-center text-green-600 ">
                    Spice up your server with a cool name 🦄
                </DialogDescription>
                <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-8 px-6">
              <div className="flex items-center justify-center text-center">
                <FormField 
                control={form.control}
                name="imageUrl"
                render={({field})=>(
                    <FormItem>
                      <FormControl>
                        <FileUpload
                        endpoint ="serverImage"
                        value= {field.value}
                        onChange = {field.onChange}
                        />
                      </FormControl>
                    </FormItem>

                    )}
                />
                </div>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70"
                    >
                      Server name
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        className="bg-slate-900 border-0 focus-visible:ring-0 text-white focus-visible:ring-offset-0"
                        placeholder="Enter server name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className=" px-6 py-4">
              <Button variant="ghost" disabled={isLoading}>
                Create
              </Button>
            </DialogFooter>
          </form>
        </Form>


            </DialogContent>
        </Dialog>
    )
}