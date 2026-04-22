import type { AuthStrategy } from "@/lib/authProvider";
import { Award } from "@/types/award";
import { fetchHalCollection } from "./halClient";

export class AwardsService {
    constructor(private readonly authStrategy: AuthStrategy) {}

    async getAwardsByWinner(teamUri: string): Promise<Award[]> {
        return fetchHalCollection<Award>(
            `/awards/search/findByWinner?winner=${encodeURIComponent(teamUri)}`,
            this.authStrategy,
            "awards"
        );
    }
}
