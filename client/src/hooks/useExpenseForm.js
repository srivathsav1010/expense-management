import { useState, useCallback } from "react";
import { DEFAULT_CATEGORY } from "@constants/categories";
import { todayISO } from "@utils/helpers";
import { validateExpenseForm } from "@utils/validators";

const makeEmpty = () => ({ amount: "", category: DEFAULT_CATEGORY, date: todayISO(), note: "" });

export function useExpenseForm(onSubmit) {
  const [form,    setForm]    = useState(makeEmpty);
  const [error,   setError]   = useState(null);
  const [touched, setTouched] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const setField = useCallback((field, value) => {
    setForm(p => ({ ...p, [field]: value }));
    if (touched) setError(null);
  }, [touched]);

  const reset = useCallback(() => {
    setForm(makeEmpty());
    setError(null);
    setTouched(false);
    setSubmitting(false);
  }, []);

  const submit = useCallback(async () => {
    setTouched(true);
    const { valid, error: err } = validateExpenseForm(form);
    if (!valid) { setError(err); return false; }
    setSubmitting(true);
    try {
      await onSubmit(form);
      reset();
      return true;
    } catch (e) {
      setError(e.message);
      setSubmitting(false);
      return false;
    }
  }, [form, onSubmit, reset]);

  return { form, setField, error, submit, reset, submitting };
}
