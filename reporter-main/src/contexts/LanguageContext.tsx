import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

// Define available languages
export type Language = 'en' | 'ar';

// Create translations object
export const translations = {
  en: {
    // Navigation
    home: 'Home',
    reportIssue: 'Report Issue',
    viewIssues: 'View Issues',
    about: 'About',
    signIn: 'Sign In',
    signOut: 'Sign Out',
    myReports: 'My Reports',
    
    // Footer
    aboutLink: 'About',
    contactUs: 'Contact Us',
    privacyPolicy: 'Privacy Policy',
    termsOfService: 'Terms of Service',
    services: 'Services',
    reportAnIssue: 'Report an Issue',
    viewIssuesFooter: 'View Issues',
    communityStatistics: 'Community Statistics',
    allRightsReserved: 'All rights reserved',
    
    // Home page
    heroTitle: 'Your voice matters in our community',
    heroSubtitle: 'Report local issues, track the resolution progress, and help improve your neighborhood.',
    reportButton: 'Report an Issue',
    viewIssuesButton: 'View Issues',
    howItWorks: 'How It Works',
    reportAnIssueTitle: 'Report an Issue',
    reportAnIssueDesc: 'Submit details about the problem you\'ve spotted in your community.',
    locatePrecisely: 'Locate Precisely',
    locatePreciselyDesc: 'Mark the exact location on the map to help officials find and fix the issue.',
    trackProgress: 'Track Progress',
    trackProgressDesc: 'Follow the status of your report from submission to resolution.',
    learnMore: 'Learn More',
    recentReports: 'Recent Reports',
    viewAll: 'View All',
    readyToImprove: 'Ready to improve your community?',
    readyToImproveDesc: 'Your reports help make our city better for everyone. Join thousands of active citizens making a difference.',
    reportNow: 'Report an Issue Now',
    
    // Issues page
    communityIssues: 'Community Issues',
    searchIssues: 'Search issues...',
    filter: 'Filter',
    status: 'Status',
    showingIssues: 'Showing {count} issues',
    noIssuesMatch: 'No issues match your search criteria.',
    
    // Statuses
    pending: 'Pending',
    inProgress: 'In Progress',
    resolved: 'Resolved',
    rejected: 'Rejected',
    
    // Sign in/up
    createAccount: 'Create an Account',
    fillDetails: 'Fill in your details to create a new account',
    accountType: 'Account Type',
    regularUser: 'Regular User',
    governmentUser: 'Government User',
    email: 'Email',
    officialEmail: 'For government accounts, use your official email with .gov domain',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    username: 'Username',
    nationalId: 'National ID Number',
    phoneNumber: 'Phone Number',
    governmentDepartment: 'Government Department',
    selectDepartment: 'Select your department',
    creatingAccount: 'Creating Account...',
    createAccountButton: 'Create Account',
    alreadyHaveAccount: 'Already have an account?',
    signInLink: 'Sign in',
    employeeId: 'Employee ID', // إضافة المفتاح الجديد
    
    // Report page
    reportIssueTitle: 'Report an Issue',
    issueDetails: 'Issue Details',
    provideInformation: 'Provide information about the issue you want to report',
    issueTitle: 'Issue Title',
    issueTitlePlaceholder: 'Brief description of the issue',
    description: 'Description',
    descriptionPlaceholder: 'Please provide details about the issue...',
    category: 'Category',
    selectCategory: 'Select category',
    locationInfo: 'Location Information',
    tellWhereIssue: 'Tell us where the issue is located',
    addressOrLocation: 'Address or Location Description',
    addressExample: 'Example: King Abdullah Street, or \'Intersection of University Street and Queen Rania Street\'',
    markLocationMap: 'Mark Location on Map',
    contactInfo: 'Contact Information',
    optionalContact: 'Optional: Provide your contact details for follow-up',
    yourName: 'Your Name',
    emailAddress: 'Email Address',
    emailUsage: 'We\'ll only use this to update you about your report.',
    submitReport: 'Submit Your Report',
    reviewInformation: 'Review your information and submit your issue report',
    submissionDisclaimer: 'By submitting this report, you confirm that the information provided is accurate to the best of your knowledge and may be shared with relevant government departments.',
    submitting: 'Submitting...',
    submitReportButton: 'Submit Report',

    // MyReports page
    pleaseSignIn: 'Please Sign In',
    viewDetails: 'View Details',
    titleLabel: 'Title',
    locationLabel: 'Location',
    descriptionLabel: 'Description',
  },
  ar: {
    // Navigation
    home: 'الرئيسية',
    reportIssue: 'الإبلاغ عن مشكلة',
    viewIssues: 'عرض المشكلات',
    about: 'حول',
    signIn: 'تسجيل الدخول',
    signOut: 'تسجيل الخروج',
    myReports: 'تقاريري',
    
    // Footer
    aboutLink: 'حول',
    contactUs: 'اتصل بنا',
    privacyPolicy: 'سياسة الخصوصية',
    termsOfService: 'شروط الخدمة',
    services: 'الخدمات',
    reportAnIssue: 'الإبلاغ عن مشكلة',
    viewIssuesFooter: 'عرض المشكلات',
    communityStatistics: 'إحصائيات المجتمع',
    allRightsReserved: 'جميع الحقوق محفوظة',
    
    // Home page
    heroTitle: 'صوتك مهم في مجتمعنا',
    heroSubtitle: 'أبلغ عن المشكلات المحلية، وتتبع مراحل الحل، وساعد في تحسين حيك.',
    reportButton: 'الإبلاغ عن مشكلة',
    viewIssuesButton: 'عرض المشكلات',
    howItWorks: 'كيف يعمل',
    reportAnIssueTitle: 'الإبلاغ عن مشكلة',
    reportAnIssueDesc: 'قدم تفاصيل حول المشكلة التي لاحظتها في مجتمعك.',
    locatePrecisely: 'تحديد الموقع بدقة',
    locatePreciselyDesc: 'حدد الموقع بدقة على الخريطة لمساعدة المسؤولين في العثور على المشكلة وإصلاحها.',
    trackProgress: 'تتبع التقدم',
    trackProgressDesc: 'تابع حالة تقريرك من التقديم إلى الحل.',
    learnMore: 'تعرف على المزيد',
    recentReports: 'التقارير الأخيرة',
    viewAll: 'عرض الكل',
    readyToImprove: 'مستعد لتحسين مجتمعك؟',
    readyToImproveDesc: 'تقاريرك تساعد في جعل مدينتنا أفضل للجميع. انضم إلى آلاف المواطنين النشطين الذين يحدثون فرقًا.',
    reportNow: 'أبلغ عن مشكلة الآن',
    
    // Issues page
    communityIssues: 'مشكلات المجتمع',
    searchIssues: 'البحث في المشكلات...',
    filter: 'تصفية',
    status: 'الحالة',
    showingIssues: 'عرض {count} مشكلة',
    noIssuesMatch: 'لا توجد مشكلات تطابق معايير البحث الخاصة بك.',
    
    // Statuses
    pending: 'قيد الانتظار',
    inProgress: 'قيد التنفيذ',
    resolved: 'تم الحل',
    rejected: 'مرفوض',
    
    // Sign in/up
    createAccount: 'إنشاء حساب',
    fillDetails: 'املأ التفاصيل الخاصة بك لإنشاء حساب جديد',
    accountType: 'نوع الحساب',
    regularUser: 'مستخدم عادي',
    governmentUser: 'مستخدم حكومي',
    email: 'البريد الإلكتروني',
    officialEmail: 'للحسابات الحكومية، استخدم بريدك الإلكتروني الرسمي بنطاق .gov',
    password: 'كلمة المرور',
    confirmPassword: 'تأكيد كلمة المرور',
    username: 'اسم المستخدم',
    nationalId: 'رقم الهوية الوطنية',
    phoneNumber: 'رقم الهاتف',
    governmentDepartment: 'القسم الحكومي',
    selectDepartment: 'اختر قسمك',
    creatingAccount: 'جاري إنشاء الحساب...',
    createAccountButton: 'إنشاء حساب',
    alreadyHaveAccount: 'هل لديك حساب بالفعل؟',
    signInLink: 'تسجيل الدخول',
    employeeId: 'رقم الوظيفي', // إضافة المفتاح الجديد
    
    // Report page
    reportIssueTitle: 'الإبلاغ عن مشكلة',
    issueDetails: 'تفاصيل المشكلة',
    provideInformation: 'قدم معلومات عن المشكلة التي تريد الإبلاغ عنها',
    issueTitle: 'عنوان المشكلة',
    issueTitlePlaceholder: 'وصف موجز للمشكلة',
    description: 'الوصف',
    descriptionPlaceholder: 'يرجى تقديم تفاصيل عن المشكلة...',
    category: 'الفئة',
    selectCategory: 'اختر الفئة',
    locationInfo: 'معلومات الموقع',
    tellWhereIssue: 'أخبرنا أين تقع المشكلة',
    addressOrLocation: 'العنوان أو وصف الموقع',
    addressExample: 'مثال: شارع الملك عبدالله، أو "تقاطع شارع الجامعة مع شارع الملكة رانيا"',
    markLocationMap: 'حدد الموقع على الخريطة',
    contactInfo: 'معلومات الاتصال',
    optionalContact: 'اختياري: قدم تفاصيل الاتصال الخاصة بك للمتابعة',
    yourName: 'اسمك',
    emailAddress: 'البريد الإلكتروني',
    emailUsage: 'سنستخدم هذا فقط لإبلاغك بتحديثات عن بلاغك.',
    submitReport: 'إرسال البلاغ',
    reviewInformation: 'راجع معلوماتك وأرسل بلاغ المشكلة',
    submissionDisclaimer: 'بإرسال هذا البلاغ، فإنك تؤكد أن المعلومات المقدمة دقيقة على حد علمك وقد يتم مشاركتها مع الإدارات الحكومية ذات الصلة.',
    submitting: 'جاري الإرسال...',
    submitReportButton: 'إرسال البلاغ',

    // MyReports page
    pleaseSignIn: 'يرجى تسجيل الدخول',
    viewDetails: 'عرض التفاصيل',
    titleLabel: 'العنوان',
    locationLabel: 'الموقع',
    descriptionLabel: 'الوصف',
  }
};

// Create the context type
type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof typeof translations.en) => string;
};

// Create the context with default values
const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: (key) => key.toString(),
});

// Create the provider component
interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguage] = useState<Language>(() => {
    // Try to get the saved language from localStorage
    const savedLanguage = localStorage.getItem('language') as Language;
    return savedLanguage === 'ar' ? 'ar' : 'en';
  });

  // Function to change language
  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    // Save to localStorage
    localStorage.setItem('language', lang);
  };

  // Set initial document direction on mount
  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  // Translation function
  const t = (key: keyof typeof translations.en): string => {
    return translations[language][key] || key.toString();
  };

  const value = {
    language,
    setLanguage: changeLanguage,
    t
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

// Create a hook to use the language context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};