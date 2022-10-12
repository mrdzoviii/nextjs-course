export type Post = {
  title: string;
  image: string;
  excerpt: string;
  date: string;
  slug: string;
  content: string;
  isFeatured: boolean;
};

export interface IContactFormRequest {
  email: string;
  name: string;
  message: string;
}

export type ContactForm = IContactFormRequest && {
  _id: string
}
