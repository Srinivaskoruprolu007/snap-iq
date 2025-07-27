"use client"
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";

const DashboardPage = () => {
 const data = useQuery(api.projects.getUserProjects);
 console.log(data)
  return <div>DashboardPage</div>;
};

export default DashboardPage;
