import Link from "next/link";

export default function Presentation() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Choose a Question Page</h1>
      <br/>
      <ul>
        <li>
          <Link href="/question1">Go to Question 1</Link>
        </li>
        <li>
          <Link href="/question2">Go to Question 2</Link>
        </li>
      </ul>
    </div>
  );
}