import { Suspense } from "react";
import { supabase } from "./lib/supabase";
import DashboardPageClient from "./Dashboard";
import Loading from "./Loading";

export const revalidate = 0;

export default async function DashboardPage() {
  const { data: profiles } = await supabase
    .from("profiles")
    .select("id, full_name, current_streak")
    .limit(1);

  const profile = profiles?.[0] || {
    id: "00000000-0000-0000-0000-000000000000",
    full_name: "Susmita Kar",
    current_streak: 7,
  };

  const { data: activityLogs } = await supabase
    .from("user_activity")
    .select("active_days_array")
    .eq("user_id", profile.id)
    .single();

  const fallbackActivity = [
    true,
    true,
    false,
    true,
    true,
    true,
    false,
    true,
    false,
    true,
    true,
    true,
    true,
    false,
    true,
    true,
    true,
    false,
    false,
    true,
    true,
    true,
    true,
    true,
  ];

  const finalActivityData = activityLogs?.active_days_array || fallbackActivity;

  const { data: masterCourses } = await supabase
    .from("courses")
    .select("id, title, icon_name");

  const defaultCourses = [
    { id: "react-basics-uuid", title: "React Basics", icon_name: "Atom" },
    { id: "js-uuid", title: "JavaScript Fundamentals", icon_name: "Code" },
    { id: "tailwind-uuid", title: "Tailwind CSS Layouts", icon_name: "Layers" },
    { id: "uiux-uuid", title: "UI/UX System Design", icon_name: "Sparkles" },
  ];

  const courseList =
    masterCourses && masterCourses.length > 0 ? masterCourses : defaultCourses;

  const { data: enrollments } = await supabase
    .from("enrollments")
    .select("course_id, progress")
    .eq("student_id", profile.id);

  const { data: newsFeed } = await supabase
    .from("announcements")
    .select("id, content")
    .order("created_at", { ascending: false });

  const enrolledIds = enrollments?.map((e) => String(e.course_id)) || [];

  const enrolledCards = courseList
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

  const availableCards = courseList
    .filter((course) => !enrolledIds.includes(String(course.id)))
    .map((course) => ({
      id: String(course.id),
      title: course.title,
      iconName: course.icon_name,
      progress: 0,
      isEnrolled: false,
    }));

  const dashboardCards = [...enrolledCards, ...availableCards];

  const fallbackAnnouncements = [
    { id: "ex1", content: "Next-Gen Dashboard v2.0 features are now live!" },
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
        cards={dashboardCards}
        announcements={
          newsFeed && newsFeed.length > 0 ? newsFeed : fallbackAnnouncements
        }
        activityDays={finalActivityData} // <-- Pass the real database array down here!
      />
    </Suspense>
  );
}
