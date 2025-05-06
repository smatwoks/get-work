import { auth } from "@/app/utils/auth";
import { prisma } from "@/app/utils/db";
import { requireUser } from "@/app/utils/requireUser";
import { EmptyState } from "@/components/general/EmptyState";
import { JobCard } from "@/components/general/JobCard";

// Define the types for the saved job post data
interface Company {
  name: string;
  logo: string;
  location: string;
  about: string;
}

interface JobPost {
  id: string;
  jobTitle: string;
  salaryFrom: number;
  salaryTo: number;
  employmentType: string;
  location: string;
  createdAT: Date;
  company: Company;
}

interface Favorite {
  JobPost: JobPost;
}

async function getFavorites(userId: string) {
  const data = await prisma.savedJobPost.findMany({
    where: {
      userId: userId,
    },
    select: {
      JobPost: {
        select: {
          id: true,
          jobTitle: true,
          salaryFrom: true,
          salaryTo: true,
          employmentType: true,
          location: true,
          createdAT: true,
          company: {
            select: {
              name: true,
              logo: true,
              location: true,
              about: true,
            },
          },
        },
      },
    },
  });
  return data;
}

export default async function FavoritesPage() {
  const session = await requireUser();
  const data = await getFavorites(session?.id as string);

  if (data.length === 0) {
    return (
      <EmptyState
        title="No Favorites found"
        description="You don't have any favorites yet."
        buttonText="Find a job"
        href="/"
      />
    );
  }

  return (
    <div className="grid grid-cols-1 mt-5 gap-4">
      {data.map((favorite: Favorite) => (
        <JobCard key={favorite.JobPost.id} job={favorite.JobPost} />
      ))}
    </div>
  );
}
