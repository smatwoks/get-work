import {z} from "zod";
export const companySchema  =z.object({
    name:z.string().min(2,"Company name must be at leaste 2 characters"),
    location:z.string().min(1,"location must be defined"),
    about:z.string().min(10,"Please provide some information about your company"),
    logo:z.string().min(1,"please upload a logo"),
    website:z.string().url("please enter a valid URL"),
    xAccount:z.string().optional(),
});

export const jobSeekerSchema = z.object({
    name:z.string().min(2,"Name must be at least 2 Characters"),
    about:z.string().min(10,"Please provide more more information about yourself"),
    resume:z.string().min(1,"Please upload your resume"),
});


export const jobSchema  = z.object({
    jobTitle: z.string().min(2,"jobtitle must be 2 characters"),
    employementType:z.string().min(1,"please select an employment type"),
    location:z.string().min(1,"please selsect location"),
    salaryFrom:z.number().min(1,"slary rfom is required"),
    salaryTo:z.number().min(1,"salary to is required"),
    jobDescription:z.string().min(1,"Job description is required"),
    listingDuration:z.number().min(1,"Listing duration is required"),
    benefits:z.array(z.string()).min(1,"please select atleast one benifit"),
    companyName:z.string().min(1,"company name is required"),
    companyLocation:z.string().min(1,"location is required"),
    companyAbout:z.string().min(1,"Company description is required"),
    companyLogo:z.string().min(1,"logo is required"),
    companyWebsite:z.string().min(1,"company website is reqired"),
    companyXAccount:z.string().optional(),
})