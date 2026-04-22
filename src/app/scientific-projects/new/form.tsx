"use client";

import { Button } from "@/app/components/button";
import { Input } from "@/app/components/input";
import { Label } from "@/app/components/label";
import { Textarea } from "@/app/components/textarea";
import { Option, OptionSelect } from "@/app/scientific-projects/_project-form-shared";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm, useWatch } from "react-hook-form";
import { createScientificProject } from "./actions";

type FormValues = {
    name: string;
    description: string;
    edition: string;
    team: string;
};


export default function NewScientificProjectForm({
    editionOptions,
    teamsPerEdition,
}: Readonly<{
    editionOptions: Option[];
    teamsPerEdition: Record<string, Option[]>;
}>) {
    const [submitError, setSubmitError] = useState<string | null>(null);
    const { register, handleSubmit, control, setValue, formState: { errors, isSubmitting } } = useForm<FormValues>();
    const router = useRouter();

    const watchedEdition = useWatch({ control, name: "edition" });
    const visibleTeams = teamsPerEdition[watchedEdition] ?? [];

    useEffect(() => {
        setValue("team", "");
    }, [watchedEdition, setValue]);

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        setSubmitError(null);
        try {
            await createScientificProject({
                comments: `${data.name}\n\n${data.description}`,
                team: data.team,
                edition: data.edition,
            });
            router.push("/scientific-projects");
        } catch {
            setSubmitError("Failed to create scientific project. Please try again.");
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="mx-auto grid max-w-xl gap-5">
            {submitError && (
                <p className="border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm font-medium text-destructive">
                    {submitError}
                </p>
            )}

            <div className="grid gap-2">
                <Label htmlFor="name">Project name</Label>
                <Input
                    id="name"
                    {...register("name", {
                        required: "Project name is required",
                        maxLength: { value: 100, message: "Max 100 characters" }
                    })}
                />
                {errors.name && (
                    <p className="text-sm text-destructive">{errors.name.message}</p>
                )}
            </div>

            <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                    id="description"
                    {...register("description", {
                        required: "Description is required",
                        maxLength: { value: 400, message: "Max 400 characters" }
                    })}
                />
                {errors.description && (
                    <p className="text-sm text-destructive">{errors.description.message}</p>
                )}
            </div>

            <OptionSelect
                id="edition"
                label="Edition"
                options={editionOptions}
                registration={register("edition", { required: "Edition is required" })}
                error={errors.edition?.message}
                placeholder="Select an edition..."
            />

            <OptionSelect
                id="team"
                label="Team"
                options={visibleTeams}
                registration={register("team", { required: "Team is required" })}
                error={errors.team?.message}
                disabled={!watchedEdition}
                placeholder={watchedEdition ? "Select a team..." : "Select an edition first..."}
            />

            <Button
                type="submit"
                className="mt-2 w-full"
                loading={isSubmitting}
                loadingText="Creating project..."
            >
                Create project
            </Button>
        </form>
    );
}
