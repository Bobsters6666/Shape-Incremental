import { redirect } from "next/navigation";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";

export default async function User() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin");
  }

  return (
    <div>
      <div>{JSON.stringify(session)}</div>
    </div>
  );
}
