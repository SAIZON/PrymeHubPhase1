import { FileText } from "lucide-react";

export default function TermsOfService() {
  return (
    <div className="min-h-screen py-16 md:py-20">
      <div className="container max-w-4xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6">
            <FileText className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">Terms of Service</h1>
          <p className="text-muted-foreground">Last updated: January 2025</p>
        </div>

        <div className="prose prose-gray max-w-none space-y-8">
          <section className="bg-card rounded-xl p-6 shadow-card border border-border/50">
            <h2 className="text-xl font-semibold text-foreground mb-4">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground">
              By accessing and using the PRYME platform ("Service"), you agree to be bound by these 
              Terms of Service. If you do not agree to these terms, please do not use our Service. 
              We reserve the right to modify these terms at any time, and your continued use of the 
              Service constitutes acceptance of any changes.
            </p>
          </section>

          <section className="bg-card rounded-xl p-6 shadow-card border border-border/50">
            <h2 className="text-xl font-semibold text-foreground mb-4">2. Description of Service</h2>
            <p className="text-muted-foreground mb-4">
              PRYME is a loan aggregation platform that helps users:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Compare loan offers from multiple banks and financial institutions</li>
              <li>Calculate EMI and loan eligibility</li>
              <li>Submit loan applications to partner institutions</li>
              <li>Track application status and manage documents</li>
            </ul>
            <p className="text-muted-foreground mt-4">
              PRYME acts as an intermediary and does not directly provide loans or financial products.
            </p>
          </section>

          <section className="bg-card rounded-xl p-6 shadow-card border border-border/50">
            <h2 className="text-xl font-semibold text-foreground mb-4">3. User Responsibilities</h2>
            <p className="text-muted-foreground mb-4">As a user of PRYME, you agree to:</p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Provide accurate, current, and complete information</li>
              <li>Maintain the confidentiality of your account credentials</li>
              <li>Not use the Service for any illegal or unauthorized purpose</li>
              <li>Not attempt to gain unauthorized access to our systems</li>
              <li>Not submit false or misleading information in loan applications</li>
            </ul>
          </section>

          <section className="bg-card rounded-xl p-6 shadow-card border border-border/50">
            <h2 className="text-xl font-semibold text-foreground mb-4">4. Loan Application Process</h2>
            <p className="text-muted-foreground mb-4">
              When you submit a loan application through PRYME:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>We forward your application to relevant partner institutions</li>
              <li>Final loan approval is at the sole discretion of the lending institution</li>
              <li>Interest rates, terms, and conditions are set by the lending institution</li>
              <li>PRYME does not guarantee loan approval or specific terms</li>
            </ul>
          </section>

          <section className="bg-card rounded-xl p-6 shadow-card border border-border/50">
            <h2 className="text-xl font-semibold text-foreground mb-4">5. Fees and Charges</h2>
            <p className="text-muted-foreground">
              PRYME's comparison and application services are free for users. Any processing fees, 
              interest charges, or other costs associated with loans are charged by the respective 
              lending institutions and will be clearly disclosed during the application process.
            </p>
          </section>

          <section className="bg-card rounded-xl p-6 shadow-card border border-border/50">
            <h2 className="text-xl font-semibold text-foreground mb-4">6. Limitation of Liability</h2>
            <p className="text-muted-foreground">
              PRYME shall not be liable for any direct, indirect, incidental, or consequential damages 
              arising from your use of the Service, including but not limited to loan rejections, 
              delays in processing, or actions of partner institutions. Our liability is limited to 
              the maximum extent permitted by applicable law.
            </p>
          </section>

          <section className="bg-card rounded-xl p-6 shadow-card border border-border/50">
            <h2 className="text-xl font-semibold text-foreground mb-4">7. Intellectual Property</h2>
            <p className="text-muted-foreground">
              All content, trademarks, and intellectual property on the PRYME platform are owned by 
              PRYME Financial Services or its licensors. You may not copy, reproduce, or distribute 
              any content without prior written permission.
            </p>
          </section>

          <section className="bg-card rounded-xl p-6 shadow-card border border-border/50">
            <h2 className="text-xl font-semibold text-foreground mb-4">8. Governing Law</h2>
            <p className="text-muted-foreground">
              These Terms shall be governed by and construed in accordance with the laws of India. 
              Any disputes arising from these Terms shall be subject to the exclusive jurisdiction 
              of the courts in Indore, Madhya Pradesh.
            </p>
          </section>

          <section className="bg-card rounded-xl p-6 shadow-card border border-border/50">
            <h2 className="text-xl font-semibold text-foreground mb-4">9. Contact Information</h2>
            <p className="text-muted-foreground">
              For any questions regarding these Terms of Service, please contact us:
            </p>
            <div className="mt-4 p-4 bg-muted/50 rounded-lg">
              <p className="text-foreground font-medium">PRYME Financial Services</p>
              <p className="text-muted-foreground">Email: legal@pryme.in</p>
              <p className="text-muted-foreground">Address: 123 Finance Tower, Vijay Nagar, Indore - 452010</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}