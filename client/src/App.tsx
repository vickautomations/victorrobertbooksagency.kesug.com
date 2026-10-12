import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { About, Contact, Conversation, FAQ, Home, InsightDetail, Insights, Investment, LegalPage, NotFoundPage, Process, Resources, ServiceDetail, Services, Testimonials, ThankYou, Work, WorkDetail } from "./pages/SitePages";

function Router() {
  return <Switch>
    <Route path="/" component={Home} />
    <Route path="/about" component={About} />
    <Route path="/services" component={Services} />
    <Route path="/services/:slug">{params => <ServiceDetail slug={params.slug} />}</Route>
    <Route path="/work" component={Work} />
    <Route path="/work/:slug">{params => <WorkDetail slug={params.slug} />}</Route>
    <Route path="/testimonials" component={Testimonials} />
    <Route path="/process" component={Process} />
    <Route path="/investment" component={Investment} />
    <Route path="/faq" component={FAQ} />
    <Route path="/insights" component={Insights} />
    <Route path="/insights/:slug">{params => <InsightDetail slug={params.slug} />}</Route>
    <Route path="/resources" component={Resources} />
    <Route path="/contact" component={Contact} />
    <Route path="/conversation" component={Conversation} />
    <Route path="/thank-you" component={ThankYou} />
    <Route path="/privacy">{() => <LegalPage type="privacy" />}</Route>
    <Route path="/terms">{() => <LegalPage type="terms" />}</Route>
    <Route path="/accessibility">{() => <LegalPage type="accessibility" />}</Route>
    <Route path="/404" component={NotFoundPage} />
    <Route component={NotFoundPage} />
  </Switch>;
}

export default function App() {
  return <ErrorBoundary><ThemeProvider defaultTheme="light"><TooltipProvider><Toaster /><Router /></TooltipProvider></ThemeProvider></ErrorBoundary>;
}
