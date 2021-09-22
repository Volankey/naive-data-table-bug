export interface TagModel {
    id: number;
    name: string;
}
export interface TableItemModel {
    id: number;
    name: string;
    tags: TagModel[];
}