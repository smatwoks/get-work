"use client"
import { XIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";
import { cityList } from "@/app/utils/cityList";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

const jobTypes = ["full-time","part-time","contract","internship"];

export function JobFilter(){
    const router = useRouter();
    const searchParams = useSearchParams();

    const currentJobTypes = searchParams.get("jobTypes")?.split(",") ||[];

    const currentLocation = searchParams.get("location")|| "";

    function clearAllFilter(){
        router.push("/");
    }
    const createQueryString = useCallback(
        ( name:string,value:string)=>{
            const params = new URLSearchParams(searchParams.toString())

            if(value){
                params.set(name,value)
            }else{
                params.delete(name)
            }
            return params.toString()
        },[searchParams]
    )
    function handleJobTypeChange(jobType:string,checked:boolean){
        const current = new Set(currentJobTypes);

        if(checked){
            current.add(jobType)
        }else{
            current.delete(jobType)
        }
        const newVaule  = Array.from(current).join(",");
        router.push(`?${createQueryString("jobTypes",newVaule)}`)
    }

function handleLocationChange(location:string){
    router.push(`?${createQueryString("location",location)}`);
}
    return(
        <Card className="col-span-1 h-fit">
            <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle className="text-2xl font-semibold">Filters</CardTitle>
            <Button onClick={clearAllFilter} variant="destructive" size="sm" className="h-8">
                <span>Clear All</span>
                <XIcon className="size-4" />
            </Button>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-4">
                    <Label className="text-lg font-semibold">Job Type</Label>
                    <div className="grid grid-cols-2 gap-4">
                        {jobTypes.map((type)=>(
                            <div key={type} className="flex items-center space-x-2">
                                <Checkbox onCheckedChange={(checked)=>{
                                    handleJobTypeChange(type,checked as boolean)
                                }} id={type} checked={currentJobTypes.includes(type)} />
                                <Label className="text-sm font-medium" htmlFor={type}>{type}</Label>
                            </div>
                        ))}
                    </div>
                </div>
                <Separator className="mb-4" />

                <div className="space-y-4">
                    <Label className="text-lg font-semibold">
                        Location
                    </Label>
                    <Select onValueChange={(location)=>{
                        handleLocationChange(location)
                    }}  value={currentLocation}>
                        <SelectTrigger>
                            <SelectValue placeholder="Selcet Location"/>
                        </SelectTrigger>
                        <SelectContent >
                    <SelectGroup>
                        <SelectLabel>Worldwide</SelectLabel>
                               <SelectItem value="worldwide"><span>🌍</span><span className="pl-2">Worldwide / Remote</span></SelectItem>
                                       </SelectGroup>
                                        <SelectGroup>
                                      <SelectLabel>
                                           {cityList.map((cite)=>(
                                        <SelectItem key={cite.id} value={cite.name}>
                                           <span className="pl-2">{cite.name}</span>
                                           </SelectItem>
                                         ))}
                                    </SelectLabel>
                         </SelectGroup>
                      </SelectContent>
                    </Select>
                </div>
            </CardContent>
        </Card>
    )
}