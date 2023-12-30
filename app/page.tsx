import Calendar from "@/features/Calendar/Calendar";
import Day from "@/features/Calendar/Day";
import Days from "@/features/Calendar/Days";

export default function Home() {
  return (
    <>
      <title>Next Bootstrap</title>
      <Calendar>
        <Days />
      </Calendar>
    </>
  );
}
