export type ExcursionsCreateRequest = {
    photos: File[];
    titles: string[];
    duration: number;
    title: string;
    slogan: string;
    description: string;
    age_limit: number;
    people_limit: number;
    city: number;
    ex_type: number;
    cost: string;
    main_photo: File;
    transport: number;
    guide: number;
    languages: number[];
    categories: number[];
    locations: string[];
    details: string[];
    important: string[];
    payment_type: number;
};

export type ExcursionsGetRequest = {
    categories?: string;
    city?: string;
    age_limit?: string;
    people_limit?: string;
    languages?: string;
    limit?: string;
    count_of_books?: string;
    ex_type?: string;
    guide?: string;
    transport?: string;
    search?: string;
    ordering?: string;
};
