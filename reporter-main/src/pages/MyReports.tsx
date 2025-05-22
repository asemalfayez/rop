import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Building, ThumbsUp, MessageSquare } from "lucide-react";

export default function MyReports() {
  const { user } = useAuth();
  const { t } = useLanguage();

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">{t('pleaseSignIn')}</h1>
        <Button asChild>
          <Link to="/signin">{t('signIn')}</Link>
        </Button>
      </div>
    );
  }

  const mockReports = [
    { id: "1", title: "Broken Street Light", location: "King Abdullah Street", description: "Street light has been out for a week.", status: "pending", category: "Infrastructure", department: "Municipality", date: "2025-03-20", votes: 5, comments: 2 },
    { id: "2", title: "Pothole on Main Road", location: "Queen Rania Street", description: "Large pothole causing traffic issues.", status: "inProgress", category: "Roads", department: "Public Works", date: "2025-03-21", votes: 8, comments: 3 },
    { id: "3", title: "Overflowing Trash Bin", location: "University Street", description: "Trash bin near park is overflowing.", status: "resolved", category: "Sanitation", department: "Health Dept", date: "2025-03-22", votes: 3, comments: 1 },
  ];

  const statusMap = {
    pending: { label: t('pending'), className: "bg-yellow-100 text-yellow-800" },
    inProgress: { label: t('inProgress'), className: "bg-blue-100 text-blue-800" },
    resolved: { label: t('resolved'), className: "bg-green-100 text-green-800" },
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{t('myReports')}</h1>
      <div className="space-y-4">
        {mockReports.map((report) => (
          <Card key={report.id} className="issue-card">
            <CardHeader className="p-4 pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">
                    {t('titleLabel')}: {report.title}
                  </CardTitle>
                  <CardDescription className="flex items-center mt-1">
                    <MapPin className="h-3.5 w-3.5 mr-1 text-gray-500" />
                    <span>{t('locationLabel')}: {report.location}</span>
                  </CardDescription>
                </div>
                <Badge className={statusMap[report.status].className}>
                  {statusMap[report.status].label}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-2 pb-2">
              <p className="text-sm text-gray-600 line-clamp-2">
                {t('descriptionLabel')}: {report.description}
              </p>
              <div className="flex items-center mt-2 space-x-2">
                <Badge variant="outline" className="flex items-center">
                  <span className="ml-1">{report.category}</span>
                </Badge>
                <Badge variant="outline" className="flex items-center">
                  <Building className="h-3.5 w-3.5 mr-1" />
                  <span>{report.department}</span>
                </Badge>
                <span className="text-xs text-gray-500">{report.date}</span>
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-2 flex justify-between">
              <div className="flex space-x-2 text-sm text-gray-500">
                <button className="flex items-center space-x-1 hover:text-government-600">
                  <ThumbsUp className="h-4 w-4" />
                  <span>{report.votes}</span>
                </button>
                <button className="flex items-center space-x-1 hover:text-government-600">
                  <MessageSquare className="h-4 w-4" />
                  <span>{report.comments}</span>
                </button>
              </div>
              <Button variant="ghost" size="sm" asChild>
                <Link to={`/issue/${report.id}`}>{t('viewDetails')}</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}