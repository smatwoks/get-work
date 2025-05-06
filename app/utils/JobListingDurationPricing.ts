
interface iAppProps{
    days:number;
    price:number;
    description:string;
}

export const jobListingDurationPricing:iAppProps[] = [
    {
        days:30,
        price:1000,
        description:"Standard listing"
    },{
        days:60,
        price:1750,
        description:"Extended visibility"
    },
    {
        days:90,
        price:2450,
        description:"Maximum exposure"
    }
]