import { Annotation, Document } from '../../../types';

export type TagProps = {
  text: string;
  active: Annotation;
  document: Document;
  onVerseClick : (ref : string) => any;
};