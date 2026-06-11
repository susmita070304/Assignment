import { Suspense } from "react";
import { supabase } from "./lib/supabase";
import DashboardPageClient from "./Dashboard";
import Loading from "./Loading";

export const revalidate = 0; // Forces dynamic rendering on every request, bypassing stale cache

export default async function DashboardPage() {
  // 1. Fetch Student Profile Meta
  const { data: profiles } = await supabase
    .from("profiles")
    .select("id, full_name, current_streak")
    .limit(1);

  const profile = profiles?.[0] || {
    id: "00000000-0000-0000-0000-000000000000",
    full_name: "Susmita Kar",
    current_streak: 7,
  };

  // 2. Fetch Master Curriculums
  const { data: masterCourses } = await supabase
    .from("courses")
    .select("id, title, icon_name");

  // Custom schemas using strictly strings mapping directly to Lucide React components
  const defaultCourses = [
    { id: "react-basics-uuid", title: "React Basics", icon_name: "Atom" },
    { id: "js-uuid", title: "JavaScript Fundamentals", icon_name: "Code" },
    { id: "tailwind-uuid", title: "Tailwind CSS Layouts", icon_name: "Layers" },
    { id: "uiux-uuid", title: "UI/UX System Design", icon_name: "Sparkles" },
  ];

  const finalMasterCourses =
    masterCourses && masterCourses.length > 0 ? masterCourses : defaultCourses;

  // 3. Fetch Active Student Progress Logs
  const { data: enrollments } = await supabase
    .from("enrollments")
    .select("course_id, progress")
    .eq("student_id", profile.id);

  // 4. Fetch Announcements Feed Pipeline
  const { data: newsFeed } = await supabase
    .from("announcements")
    .select("id, content")
    .order("created_at", { ascending: false });

  const enrolledIds = enrollments?.map((e) => String(e.course_id)) || [];

  const enrolledCards = finalMasterCourses
    .filter((course) => enrolledIds.includes(String(course.id)))
    .map((course) => {
      const enrollmentRecord = enrollments?.find(
        (e) => String(e.course_id) === String(course.id),
      );
      return {
        id: String(course.id),
        title: course.title,
        iconName: course.icon_name,
        progress: enrollmentRecord ? enrollmentRecord.progress : 0,
        isEnrolled: true,
      };
    });

  const availableCards = finalMasterCourses
    .filter((course) => !enrolledIds.includes(String(course.id)))
    .map((course) => ({
      id: String(course.id),
      title: course.title,
      iconName: course.icon_name,
      progress: 0,
      isEnrolled: false,
    }));

  const totalDisplayCards = [...enrolledCards, ...availableCards];

  const fallbackAnnouncements = [
    {
      id: "ex1",
      content:
        "Next-Gen Dashboard v2.0 features are now live! Enjoy hardware-accelerated animations.",
    },
    {
      id: "ex2",
      content:
        "Scheduled system database optimization tonight at 12:00 AM UTC.",
    },
  ];

  return (
    <Suspense fallback={<Loading />}>
      <DashboardPageClient
        studentName={profile.full_name}
        streakCount={profile.current_streak}
        cards={totalDisplayCards}
        announcements={
          newsFeed && newsFeed.length > 0 ? newsFeed : fallbackAnnouncements
        }
      />
    </Suspense>
  );
}
