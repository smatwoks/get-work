import { prisma } from "@/app/utils/db";
import { requireUser } from "@/app/utils/requireUser";
import { CreateJobForm } from "@/components/forms/CreateJobForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import ArcjectLogo from "@/public/arcjet.jpg"
import InngestLogo from "@/public/inngest-locale.png"
import Image from "next/image";
import { redirect } from "next/navigation";
const companies = [
    {id:0,name:"Arcjet",logo:ArcjectLogo},
    {id:1,name:"inngest",logo:InngestLogo},
    {id:2,name:"Arcjet",logo:ArcjectLogo},
    {id:3,name:"inngest",logo:InngestLogo},
    {id:4,name:"Arcjet",logo:ArcjectLogo},
    {id:5,name:"inngest",logo:InngestLogo},
]

const testimonials = [
    {
        
        quote:"We found our ideal candidate within 48 hours of posting. the Quality of applications was exceptional!",
        author:"Jhon Mark",
        company:"TechSolutions",
    },
    {
        quote: "The hiring process was smooth and incredibly fast. We had multiple qualified candidates in just a few days!",
        author: "Priya Sharma",
        company: "InnovaTech",
    },
    {
        quote: "Exceptional platform! We were able to connect with top talent effortlessly and fill the position ahead of schedule.",
        author: "Carlos Mendez",
        company: "BrightFuture",
    },

]

const stats = [
    {id:0,value:"10k+",label:"Monthly active job seekers"},
    {id:1,value:"48h",label:"Average time to hire"},
    {id:2,value:"95%",label:"Employer satifaction rate"},
    {id:3,value:"500+",label:"Companies hiring remotely"},
    
];

async function getCompany(userId:string){
    const data = await prisma.company.findUnique({
        where:{
            userId:userId,
        },
        select:{
            name:true,
            location:true,
            about:true,
            logo:true,
            xAccount:true,
            website:true,
        },
    });
    if(!data){
        return redirect("/");
    } 
    return data;
}

export default async function PostJobPage(){
    const session = await requireUser();
    const data = await getCompany(session.id as string);
    return(
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-5">
            <div className="col-span-1 lg:col-span-2">
                <CardHeader>
                    <CardTitle>
                        <CreateJobForm 
                        companyAbout={data.about} 
                        companyLocation={data.location} 
                        companyLogo={data.logo} 
                        companyName={data.name} 
                        companyWebsite={data.website}  
                        companyXAccount={data.xAccount} />
                    </CardTitle>
                </CardHeader>
            </div>


            <div className="col-span-1">
                <div>
                    <CardHeader>
                        <CardTitle className="text-xl">Trusted by Industry Leaders
                        </CardTitle>
                            <CardDescription>
                                join thousands of companies hiring top talent
                            </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-3 gap-4">
                            {companies.map((company)=>(
                                <div key={company.id}>
                                    <Image  src={company.logo} alt={company.name} width={80} height={80} className="rounded-lg opacity-75 transition-opacity hover:opacity-100" />
                                </div>
                            ))}
                        </div>

                            <div className="space-y-4">
                                {testimonials.map((testmoni,index)=>(
                                    <blockquote key={index} className="border-l-2 border-primary pl-4">
                                            <p className="text-sm text-muted-foreground italic">"{testmoni.quote}"</p>
                                            <footer className="mt-2 text-sm font-medium">-{testmoni.author},{testmoni.company}</footer>
                                    </blockquote>
                                ))}
                            </div>


                            <div className="grid grid-cols-2 gap-4">
                                    {stats.map((stat)=>(
                                        <div key={stat.id} className="rounded-lg bg-muted p-4">
                                                <h4 className="text-2xl font-bold">{stat.value}</h4>
                                                <p className="text-sm text-muted-foreground">{stat.label}</p>
                                           </div> 
                                    ))}


                            </div>

                    </CardContent>
                </div>
            </div>
        </div>
    )
}