import PageShell from "@/app/components/page-shell";
import { serverAuthProvider } from "@/lib/authProvider";
import { fetchEditionFormData } from "@/app/scientific-projects/_fetch-edition-data";
import { redirect } from "next/navigation";
import NewScientificProjectForm from "./form";

export default async function NewScientificProjectPage() {
    const auth = await serverAuthProvider.getAuth();
    if (!auth) redirect("/login");

    const { editionOptions, teamsPerEdition } = await fetchEditionFormData(serverAuthProvider);

    return (
        <PageShell
            eyebrow="Innovation project"
            title="New Scientific Project"
            description="Submit a new scientific project for a FIRST LEGO League edition."
        >
            <NewScientificProjectForm
                editionOptions={editionOptions}
                teamsPerEdition={teamsPerEdition}
            />
        </PageShell>
    );
}
