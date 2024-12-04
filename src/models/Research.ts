export interface RequestResearchDto {
    id: string; // UUID format
    title: string;
    description: string;
  }
  
  export interface ResponseResearchDto {
    id: string; // UUID format
    title: string;
    description: string;
    coverImageUrl?: string;
  }
  