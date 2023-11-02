interface CoursePartBase {
  name: string;
  exerciseCount: number;
  description: string;
}

interface CoursePartBasic extends CoursePartBase {
  kind: 'basic';
}

interface CoursePartGroup extends Omit<CoursePartBase, 'description'> {
  kind: 'group';
  groupProjectCount: number;
}

interface CoursePartBackground extends CoursePartBase {
  kind: 'background';
  backgroundMaterial: string;
}

interface CoursePartSpecial extends CoursePartBase {
  requirements: string[];
  kind: 'special';
}

export type CoursePart =
  | CoursePartBasic
  | CoursePartGroup
  | CoursePartBackground
  | CoursePartSpecial;
