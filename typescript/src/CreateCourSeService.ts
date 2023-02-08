interface ICourseProps {
  name: string;
  duration?: number;
  educator: string;
}

class CreateCourseService {

  execute({duration = 8, name, educator}: ICourseProps) {
    console.log(name, duration, educator);
  }

}

export default new CreateCourseService();