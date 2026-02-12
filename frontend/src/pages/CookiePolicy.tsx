import { Cookie } from "lucide-react";

export default function CookiePolicy() {
  return (
    <div className="min-h-screen py-16 md:py-20">
      <div className="container max-w-4xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6">
            <Cookie className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">Cookie Policy</h1>
          <p className="text-muted-foreground">Last updated: January 2025</p>
        </div>

        <div className="prose prose-gray max-w-none space-y-8">
          <section className="bg-card rounded-xl p-6 shadow-card border border-border/50">
            <h2 className="text-xl font-semibold text-foreground mb-4">What Are Cookies?</h2>
            <p className="text-muted-foreground">
              Cookies are small text files that are stored on your device when you visit a website. 
              They help us provide you with a better experience by remembering your preferences, 
              keeping you logged in, and analyzing how our website is used.
            </p>
          </section>

          <section className="bg-card rounded-xl p-6 shadow-card border border-border/50">
            <h2 className="text-xl font-semibold text-foreground mb-4">Types of Cookies We Use</h2>
            
            <div className="space-y-4">
              <div className="p-4 bg-muted/50 rounded-lg">
                <h3 className="font-semibold text-foreground mb-2">Essential Cookies</h3>
                <p className="text-sm text-muted-foreground">
                  Required for the website to function properly. These include cookies for authentication, 
                  security, and form submissions. Cannot be disabled.
                </p>
              </div>

              <div className="p-4 bg-muted/50 rounded-lg">
                <h3 className="font-semibold text-foreground mb-2">Functional Cookies</h3>
                <p className="text-sm text-muted-foreground">
                  Remember your preferences such as language, region, and calculator inputs to provide 
                  a personalized experience.
                </p>
              </div>

              <div className="p-4 bg-muted/50 rounded-lg">
                <h3 className="font-semibold text-foreground mb-2">Analytics Cookies</h3>
                <p className="text-sm text-muted-foreground">
                  Help us understand how visitors interact with our website by collecting anonymous 
                  usage data. We use this information to improve our services.
                </p>
              </div>

              <div className="p-4 bg-muted/50 rounded-lg">
                <h3 className="font-semibold text-foreground mb-2">Marketing Cookies</h3>
                <p className="text-sm text-muted-foreground">
                  Used to deliver relevant advertisements and track the effectiveness of our 
                  marketing campaigns. You can opt out of these cookies.
                </p>
              </div>
            </div>
          </section>

          <section className="bg-card rounded-xl p-6 shadow-card border border-border/50">
            <h2 className="text-xl font-semibold text-foreground mb-4">Third-Party Cookies</h2>
            <p className="text-muted-foreground mb-4">
              We may use cookies from trusted third parties for:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Google Analytics - Website traffic analysis</li>
              <li>Partner banks - Session tracking for loan applications</li>
              <li>Social media platforms - Share functionality</li>
            </ul>
          </section>

          <section className="bg-card rounded-xl p-6 shadow-card border border-border/50">
            <h2 className="text-xl font-semibold text-foreground mb-4">Managing Cookies</h2>
            <p className="text-muted-foreground mb-4">
              You can control cookies through your browser settings:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Block all cookies (may affect website functionality)</li>
              <li>Delete cookies after each session</li>
              <li>Allow only certain types of cookies</li>
              <li>Use private/incognito browsing mode</li>
            </ul>
            <p className="text-muted-foreground mt-4">
              Note: Disabling essential cookies may prevent you from using certain features like 
              account login and loan applications.
            </p>
          </section>

          <section className="bg-card rounded-xl p-6 shadow-card border border-border/50">
            <h2 className="text-xl font-semibold text-foreground mb-4">Cookie Retention</h2>
            <p className="text-muted-foreground">
              Session cookies are deleted when you close your browser. Persistent cookies remain 
              on your device for varying periods depending on their purpose, ranging from 30 days 
              to 2 years. Analytics cookies are typically retained for 26 months.
            </p>
          </section>

          <section className="bg-card rounded-xl p-6 shadow-card border border-border/50">
            <h2 className="text-xl font-semibold text-foreground mb-4">Contact Us</h2>
            <p className="text-muted-foreground">
              If you have questions about our Cookie Policy, please contact:
            </p>
            <div className="mt-4 p-4 bg-muted/50 rounded-lg">
              <p className="text-foreground font-medium">PRYME Financial Services</p>
              <p className="text-muted-foreground">Email: privacy@pryme.in</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}