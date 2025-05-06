import { JobFilter } from "@/components/general/JobFilters";
import { JobListing } from "@/components/general/JobListings";
import { JobListingLoading } from "@/components/general/JobListingsLoading";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { Suspense } from "react";

type SearchParams ={
  searchParams:Promise<{
    page?:string;
    jobTypes?:string;
    location?:string;
  }>;
};

export default async function Home({searchParams}:SearchParams) {
  const params = await searchParams;
  const currentPage = Number(params.page)||1;
  const jobTypes =  params.jobTypes?.split(",") || [];
  const location =  params.location || "";
  const filterkey = `page=${currentPage};types=${jobTypes.join(",")};location=${location}`
  return (
    <div className="grid grid-cols-3 gap-8">
      <div className="col-span-1">
        <JobFilter />
      </div>
      <div className="col-span-2">
        <div className="col-span-2 flex flex-col gap-6">
          <Suspense fallback={<JobListingLoading />} key={filterkey}>
        <JobListing location={location} currentPage={currentPage} jobTypes={jobTypes}  />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
