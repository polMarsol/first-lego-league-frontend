import { Resource } from "halfred";

export interface AwardEntity {
    uri?: string;
    name?: string;
}

export type Award = AwardEntity & Resource;
