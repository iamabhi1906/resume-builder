import ResumeViewer from '@/components/resume-viewer/resume-viewer';

interface ResumePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ResumePage({ params }: ResumePageProps) {
  const { id } = await params;

  return <ResumeViewer resumeId={id} />;
}
