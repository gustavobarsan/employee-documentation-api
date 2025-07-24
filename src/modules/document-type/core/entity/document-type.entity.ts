export class DocumentType {
    id: string;
    name: string;
    description?: string;
    createdAt: Date;
    updatedAt: Date;
    constructor(props: Partial<DocumentType>) {
        Object.assign(this, props);
        if (!this.createdAt) this.createdAt = new Date();
        this.updatedAt = new Date();
    }
}