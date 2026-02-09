import { Shield } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen py-16 md:py-20">
      <div className="container max-w-4xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6">
            <Shield className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">Privacy Policy</h1>
          <p className="text-muted-foreground">Last updated: January 2025</p>
        </div>

        <div className="prose prose-gray max-w-none space-y-8">
          <section className="bg-card rounded-xl p-6 shadow-card border border-border/50">
            <h2 className="text-xl font-semibold text-foreground mb-4">1. Information We Collect</h2>
            <p className="text-muted-foreground mb-4">
              At PRYME, we collect information you provide directly to us, including:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Personal identification information (Name, email address, phone number)</li>
              <li>Financial information (Income details, employment status, existing loans)</li>
              <li>KYC documents (PAN Card, Aadhaar Card, Address proof)</li>
              <li>Usage data and cookies for improving our services</li>
            </ul>
          </section>

          <section className="bg-card rounded-xl p-6 shadow-card border border-border/50">
            <h2 className="text-xl font-semibold text-foreground mb-4">2. How We Use Your Information</h2>
            <p className="text-muted-foreground mb-4">We use the information we collect to:</p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Process and evaluate your loan applications</li>
              <li>Connect you with appropriate lending partners</li>
              <li>Communicate with you about your applications and offers</li>
              <li>Improve our platform and services</li>
              <li>Comply with legal and regulatory requirements</li>
            </ul>
          </section>

          <section className="bg-card rounded-xl p-6 shadow-card border border-border/50">
            <h2 className="text-xl font-semibold text-foreground mb-4">3. Information Sharing</h2>
            <p className="text-muted-foreground mb-4">
              We may share your information with:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Partner banks and financial institutions for loan processing</li>
              <li>Credit bureaus for credit score verification</li>
              <li>Service providers who assist in our operations</li>
              <li>Legal authorities when required by law</li>
            </ul>
            <p className="text-muted-foreground mt-4">
              We never sell your personal information to third parties for marketing purposes.
            </p>
          </section>

          <section className="bg-card rounded-xl p-6 shadow-card border border-border/50">
            <h2 className="text-xl font-semibold text-foreground mb-4">4. Data Security</h2>
            <p className="text-muted-foreground">
              We implement industry-standard security measures including encryption, secure servers, 
              and regular security audits to protect your personal and financial information. 
              All data transmission is encrypted using SSL/TLS protocols.
            </p>
          </section>

          <section className="bg-card rounded-xl p-6 shadow-card border border-border/50">
            <h2 className="text-xl font-semibold text-foreground mb-4">5. Your Rights</h2>
            <p className="text-muted-foreground mb-4">You have the right to:</p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Access your personal data</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data (subject to legal requirements)</li>
              <li>Opt-out of marketing communications</li>
              <li>Withdraw consent for data processing</li>
            </ul>
          </section>

          <section className="bg-card rounded-xl p-6 shadow-card border border-border/50">
            <h2 className="text-xl font-semibold text-foreground mb-4">6. Contact Us</h2>
            <p className="text-muted-foreground">
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <div className="mt-4 p-4 bg-muted/50 rounded-lg">
              <p className="text-foreground font-medium">PRYME Financial Services</p>
              <p className="text-muted-foreground">Email: privacy@pryme.in</p>
              <p className="text-muted-foreground">Address: 123 Finance Tower, Vijay Nagar, Indore - 452010</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}