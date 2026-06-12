import { Suspense } from "react";
import { supabase } from "./lib/supabase";
import DashboardPageClient from "./Dashboard";
import Loading from "./Loading";

export const revalidate = 0;

export default async function DashboardPage() {
  const { data: profiles } = await supabase
    .from("profiles")
    .select("*")
    .limit(1);
  const profile = profiles?.[0] || {
    full_name: "Susmita Kar",
    current_streak: 7,
    id: "0000",
  };

  const { data: activityLogs } = await supabase
    .from("user_activity")
    .select("active_days_array")
    .eq("user_id", profile.id)
    .single();

  const { data: masterCourses } = await supabase.from("courses").select("*");
  const { data: enrollments } = await supabase
    .from("enrollments")
    .select("*")
    .eq("student_id", profile.id);
  const { data: newsFeed } = await supabase
    .from("announcements")
    .select("*")
    .order("created_at", { ascending: false });

  const fallbackActivity = [
    true,
    true,
    false,
    true,
    true,
    false,
    true,
    true,
    true,
    true,
    false,
    true,
  ];
  const finalActivityData = activityLogs?.active_days_array || fallbackActivity;

  const courseList = masterCourses || [];
  const enrolledIds = enrollments?.map((e) => String(e.course_id)) || [];

  const dashboardCards = [];

  for (const course of courseList) {
    const isEnrolled = enrolledIds.includes(String(course.id));
    const enrollment = enrollments?.find(
      (e) => String(e.course_id) === String(course.id),
    );

    dashboardCards.push({
      id: String(course.id),
      title: course.title,
      iconName: course.icon_name,
      progress: isEnrolled ? enrollment?.progress || 0 : 0,
      isEnrolled: isEnrolled,
    });
  }

  const fallbackAnnouncements = [
    { id: "1", content: "Welcome to the portal!" },
    { id: "2", content: "Check out the new React course." },
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
        activityDays={finalActivityData}
      />
    </Suspense>
  );
}
