"use client";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import atsService from "@/services/ats.service";
import { Loader2, Upload } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

const ATSScanner = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [file, setFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleGeneralScan = async () => {
    if (!file) {
      toast.error("Please upload a resume");
      return;
    }

    setIsLoading(true);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("resume", file);

      const res = await atsService.getGeneralScore(formData);
      if (res.success) {
        setResult(res.data);
        toast.success("Analysis complete!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to analyze resume");
    } finally {
      setIsLoading(false);
    }
  };

  const handleJobSpecificScan = async () => {
    if (!file) {
      toast.error("Please upload a resume");
      return;
    }
    if (!jobDescription) {
      toast.error("Please enter a job description");
      return;
    }

    setIsLoading(true);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("resume", file);
      formData.append("jobDescription", jobDescription);

      const res = await atsService.getJobSpecificScore(formData);
      if (res.success) {
        setResult(res.data);
        toast.success("Analysis complete!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to analyze resume");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardLayout isLoading={isLoading}>
      <div className="container mx-auto py-10 px-4 md:px-0">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">ATS Resume Scanner</h1>
            <p className="text-muted-foreground">
              Optimize your resume for Applicant Tracking Systems and get hired faster.
            </p>
          </div>

          <Tabs defaultValue="general" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="general">General Scan</TabsTrigger>
              <TabsTrigger value="job-specific">Job Specific Scan</TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>General Resume Audit</CardTitle>
                  <CardDescription>
                    Upload your resume to get a comprehensive review of formatting, content, and impact.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="resume-general">Upload Resume (PDF)</Label>
                    <Input
                      id="resume-general"
                      type="file"
                      accept=".pdf"
                      onChange={handleFileChange}
                    />
                  </div>
                  <Button
                    onClick={handleGeneralScan}
                    disabled={isLoading || !file}
                    className="w-full"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      "Scan Resume"
                    )}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="job-specific" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Job Match Analysis</CardTitle>
                  <CardDescription>
                    See how well your resume matches a specific job description.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="resume-job">Upload Resume (PDF)</Label>
                    <Input
                      id="resume-job"
                      type="file"
                      accept=".pdf"
                      onChange={handleFileChange}
                    />
                  </div>
                  <div className="grid w-full gap-1.5">
                    <Label htmlFor="jd">Job Description</Label>
                    <Textarea
                      id="jd"
                      placeholder="Paste the job description here..."
                      className="min-h-[150px]"
                      value={jobDescription}
                      onChange={(e) => setJobDescription(e.target.value)}
                    />
                  </div>
                  <Button
                    onClick={handleJobSpecificScan}
                    disabled={isLoading || !file || !jobDescription}
                    className="w-full"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      "Analyze Match"
                    )}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {result && (
            <div className="space-y-6 animate-in fade-in-50 duration-500">
              <div className="grid gap-6 md:grid-cols-3">
                <Card className="md:col-span-1 bg-primary/5 border-primary/20">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      ATS Score
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-5xl font-bold text-primary">
                      {result.score || result.matchPercentage}%
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      {result.matchPercentage ? "Match Rate" : "Overall Score"}
                    </p>
                  </CardContent>
                </Card>

                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle>Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {result.summary || "Here is a breakdown of your resume performance based on the job description provided."}
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-red-600 flex items-center gap-2">
                      Missing Skills / Keywords
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
                      {(result.missingSkills || result.missingKeywords || []).map(
                        (item: string, i: number) => (
                          <li key={i}>{item}</li>
                        )
                      )}
                      {(result.missingSkills || result.missingKeywords || []).length === 0 && (
                        <li className="list-none text-gray-500 italic">No critical skills missing found!</li>
                      )}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-blue-600 flex items-center gap-2">
                      Improvement Suggestions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
                      {(result.suggestions || []).map((item: string, i: number) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ATSScanner;
