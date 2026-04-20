import { TaskListPage } from "@/components/tasks/task-list-page";
import { buildTaskMetadata } from "@/lib/seo";

export const revalidate = 3;
export const generateMetadata = () => buildTaskMetadata("pdf");

export default async function DevelopersPdfPage({
  searchParams,
}: {
  searchParams?: Promise<{ category?: string | string[] }>;
}) {
  const sp = (await searchParams) ?? {};
  return <TaskListPage task="pdf" category={sp.category} />;
}
