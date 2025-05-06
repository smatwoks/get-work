import { prisma } from "@/app/utils/db";
import { requireUser } from "@/app/utils/requireUser";
import { CopyLinkMenuItem } from "@/components/general/CopyLink";
import { EmptyState } from "@/components/general/EmptyState";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MoreHorizontal, PenBoxIcon, XCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Define types for job listings and company info
interface Company {
    name: string;
    logo: string;
}

interface JobListing {
    id: string;
    jobTitle: string;
    status: string;
    createdAT: Date;
    company: Company;
}

// Fetching jobs from database
async function getJobs(userId: string): Promise<JobListing[]> {
    const data = await prisma.jobPost.findMany({
        where: {
            company: {
                userId: userId,
            },
        },
        select: {
            id: true,
            jobTitle: true,
            status: true,
            createdAT: true,
            company: {
                select: {
                    name: true,
                    logo: true,
                }
            }
        },
        orderBy: {
            createdAT: "desc",
        },
    });
    return data;
}

export default async function MyJobsPage() {
    const session = await requireUser();
    const data = await getJobs(session.id as string);

    return (
        <>
            {data.length === 0 ? (
                <EmptyState
                    title="No job posts found"
                    description="You don't have any job posts yet."
                    buttonText="Create a job post"
                    href="/post-job"
                />
            ) : (
                <Card>
                    <CardHeader>
                        <CardTitle>My Jobs</CardTitle>
                        <CardDescription>
                            Manage your job listings and applications here.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Logo</TableHead>
                                    <TableHead>Company</TableHead>
                                    <TableHead>Job Title</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Created At</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {data.map((listing) => (
                                    <TableRow key={listing.id}>
                                        <TableCell>
                                            <Image
                                                src={listing.company.logo}
                                                alt={`Logo of ${listing.company.name}`}
                                                className="rounded-md size-10"
                                                width={40}
                                                height={40}
                                            />
                                        </TableCell>
                                        <TableCell>{listing.company.name}</TableCell>
                                        <TableCell>{listing.jobTitle}</TableCell>
                                        <TableCell>
                                            {listing.status.charAt(0).toUpperCase() + listing.status.slice(1).toLowerCase()}
                                        </TableCell>
                                        <TableCell>
                                            {listing.createdAT.toLocaleDateString("en-US", {
                                                month: "long",
                                                day: "numeric",
                                                year: "numeric",
                                            })}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon">
                                                        <MoreHorizontal />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                    <DropdownMenuItem asChild>
                                                        <Link href={`/my-jobs/${listing.id}/edit`}>
                                                            <PenBoxIcon />
                                                            Edit Job
                                                        </Link>
                                                    </DropdownMenuItem>
                                                    <CopyLinkMenuItem jobUrl={`${process.env.NEXT_PUBLIC_URL}/job/${listing.id}`} />
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem asChild>
                                                        <Link href={`/my-jobs/${listing.id}/delete`}>
                                                            <XCircle />
                                                            Delete Job
                                                        </Link>
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            )}
        </>
    );
}
