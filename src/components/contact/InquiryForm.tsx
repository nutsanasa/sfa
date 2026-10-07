import { useState, type FormEvent, type ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { submitInquiry } from "@/lib/inquiries"
import { isSupabaseConfigured } from "@/lib/supabase"

const budgets = [
  { value: "under-25", label: "Under $25k" },
  { value: "25-50", label: "$25–50k" },
  { value: "50-100", label: "$50–100k" },
  { value: "100-plus", label: "$100k+" },
  { value: "unsure", label: "Not sure yet" },
]

const projectTypes = [
  { value: "website", label: "New website" },
  { value: "product", label: "Product / platform" },
  { value: "saas", label: "SaaS" },
  { value: "mobile", label: "Mobile application" },
  { value: "commerce", label: "E-commerce" },
  { value: "software", label: "Custom software" },
  { value: "mvp", label: "MVP" },
  { value: "other", label: "Something else" },
]

const timelines = [
  { value: "asap", label: "As soon as possible" },
  { value: "1-3", label: "1–3 months" },
  { value: "3-6", label: "3–6 months" },
  { value: "flexible", label: "Flexible" },
]

type FieldErrors = Partial<Record<"name" | "email" | "message", string>>

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function InquiryForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [company, setCompany] = useState("")
  const [budget, setBudget] = useState("")
  const [projectType, setProjectType] = useState("")
  const [timeline, setTimeline] = useState("")
  const [message, setMessage] = useState("")
  const [fileName, setFileName] = useState("")
  const [errors, setErrors] = useState<FieldErrors>({})
  const [submitting, setSubmitting] = useState(false)
  const [notice, setNotice] = useState<{ tone: "ok" | "warn" | "error"; text: string } | null>(
    null
  )

  function validate() {
    const next: FieldErrors = {}
    if (name.trim().length < 2) next.name = "Please use your full name."
    if (!emailPattern.test(email.trim())) next.email = "Enter a valid email."
    if (message.trim().length < 20) {
      next.message = "Add a bit more — 20 characters minimum."
    }
    setErrors(next)
    return Object.keys(next).length === 0
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!validate()) return

    setSubmitting(true)
    setNotice(null)

    const extras = [
      projectType ? `Project type: ${projectType}` : null,
      budget ? `Budget: ${budget}` : null,
      timeline ? `Timeline: ${timeline}` : null,
      fileName ? `Attachment noted: ${fileName} (filename only — connect storage to persist files)` : null,
    ]
      .filter(Boolean)
      .join("\n")

    const composed = extras ? `${message.trim()}\n\n${extras}` : message.trim()

    try {
      const result = await submitInquiry({
        name: name.trim(),
        email: email.trim(),
        company: company.trim() || null,
        budget: budget || null,
        project_type: projectType || null,
        message: composed.slice(0, 5000),
      })

      if (result.ok) {
        setNotice({
          tone: "ok",
          text: "Received. We will write back within two working days.",
        })
        setName("")
        setEmail("")
        setCompany("")
        setBudget("")
        setProjectType("")
        setTimeline("")
        setMessage("")
        setFileName("")
        setErrors({})
        return
      }

      if (result.reason === "not_configured") {
        setNotice({
          tone: "warn",
          text: "Preview mode — inquiry captured locally. Connect Supabase to store submissions.",
        })
        return
      }

      setNotice({ tone: "error", text: result.message })
    } catch {
      setNotice({
        tone: "error",
        text: "Something went wrong. Please try again in a moment.",
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6" noValidate>
      {!isSupabaseConfigured && !notice ? (
        <p className="rounded-2xl border border-border bg-secondary/70 px-4 py-3 text-sm text-muted-foreground">
          Supabase is not connected yet. Submissions will not persist until you
          add environment variables and run the inquiries migration.
        </p>
      ) : null}

      {notice ? (
        <p
          role="status"
          className={
            notice.tone === "error"
              ? "rounded-2xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive"
              : notice.tone === "ok"
                ? "rounded-2xl border border-foreground/15 bg-secondary px-4 py-3 text-sm"
                : "rounded-2xl border border-border bg-secondary/70 px-4 py-3 text-sm text-muted-foreground"
          }
        >
          {notice.text}
        </p>
      ) : null}

      <div className="grid gap-6 sm:grid-cols-2">
        <Field id="name" label="Name" error={errors.name}>
          <Input
            id="name"
            name="name"
            autoComplete="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="h-11 rounded-xl"
            aria-invalid={Boolean(errors.name)}
          />
        </Field>
        <Field id="email" label="Email" error={errors.email}>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="h-11 rounded-xl"
            aria-invalid={Boolean(errors.email)}
          />
        </Field>
      </div>

      <Field id="company" label="Company">
        <Input
          id="company"
          name="company"
          autoComplete="organization"
          value={company}
          onChange={(event) => setCompany(event.target.value)}
          className="h-11 rounded-xl"
        />
      </Field>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="projectType">Project type</Label>
          <Select value={projectType} onValueChange={setProjectType}>
            <SelectTrigger id="projectType" className="!h-11 w-full rounded-xl">
              <SelectValue placeholder="Select a type" />
            </SelectTrigger>
            <SelectContent>
              {projectTypes.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="budget">Approximate budget</Label>
          <Select value={budget} onValueChange={setBudget}>
            <SelectTrigger id="budget" className="!h-11 w-full rounded-xl">
              <SelectValue placeholder="Select a range" />
            </SelectTrigger>
            <SelectContent>
              {budgets.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="timeline">Timeline</Label>
        <Select value={timeline} onValueChange={setTimeline}>
          <SelectTrigger id="timeline" className="!h-11 w-full rounded-xl">
            <SelectValue placeholder="Select a timeline" />
          </SelectTrigger>
          <SelectContent>
            {timelines.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Field id="message" label="Project description" error={errors.message}>
        <Textarea
          id="message"
          name="message"
          rows={6}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="What you need, who it is for, and when."
          className="rounded-xl"
          aria-invalid={Boolean(errors.message)}
        />
      </Field>

      <div className="space-y-2">
        <Label htmlFor="attachment">Optional file</Label>
        <Input
          id="attachment"
          name="attachment"
          type="file"
          accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg,.zip"
          className="h-11 rounded-xl pt-1.5"
          onChange={(event) => setFileName(event.target.files?.[0]?.name ?? "")}
        />
        <p className="text-xs text-muted-foreground">
          Briefs or references. We store the filename with the inquiry; file
          storage needs to be connected separately.
        </p>
      </div>

      <Button type="submit" className="h-12 rounded-full px-6" disabled={submitting}>
        {submitting ? "Sending…" : "Send inquiry"}
      </Button>
    </form>
  )
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string
  label: string
  error?: string
  children: ReactNode
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      {children}
      {error ? <p className="text-xs text-destructive">{error}</p> : null}
    </div>
  )
}
