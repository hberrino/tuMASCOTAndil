package com.buscatumascotandil.find.util;

import java.util.regex.Pattern;

public class SecurityUtils {

    private static final Pattern SCRIPT_PATTERN = Pattern.compile(
        "<script[^>]*>.*?</script>", Pattern.CASE_INSENSITIVE | Pattern.DOTALL
    );
    
    private static final Pattern STYLE_PATTERN = Pattern.compile(
        "<style[^>]*>.*?</style>", Pattern.CASE_INSENSITIVE | Pattern.DOTALL
    );
    
    private static final Pattern TAG_PATTERN = Pattern.compile("<[^>]+>");
    
    private static final Pattern JAVASCRIPT_PATTERN = Pattern.compile(
        "javascript:", Pattern.CASE_INSENSITIVE
    );
    
    private static final Pattern ON_EVENT_PATTERN = Pattern.compile(
        "on\\w+\\s*=", Pattern.CASE_INSENSITIVE
    );

    public static String sanitizeInput(String input) {
        if (input == null || input.isEmpty()) {
            return input;
        }
        
        String sanitized = input;
        
        sanitized = SCRIPT_PATTERN.matcher(sanitized).replaceAll("");
        sanitized = STYLE_PATTERN.matcher(sanitized).replaceAll("");
        sanitized = JAVASCRIPT_PATTERN.matcher(sanitized).replaceAll("");
        sanitized = ON_EVENT_PATTERN.matcher(sanitized).replaceAll("");
        sanitized = TAG_PATTERN.matcher(sanitized).replaceAll("");
        
        sanitized = sanitized.replace("&", "&amp;")
                            .replace("<", "&lt;")
                            .replace(">", "&gt;")
                            .replace("\"", "&quot;")
                            .replace("'", "&#x27;")
                            .replace("/", "&#x2F;");
        
        return sanitized.trim();
    }

    public static String sanitizeForDisplay(String input) {
        if (input == null || input.isEmpty()) {
            return input;
        }
        
        return input.replace("&", "&amp;")
                    .replace("<", "&lt;")
                    .replace(">", "&gt;")
                    .replace("\"", "&quot;")
                    .replace("'", "&#x27;");
    }

    public static String sanitizeFilename(String filename) {
        if (filename == null || filename.isEmpty()) {
            return filename;
        }
        
        return filename.replaceAll("[^a-zA-Z0-9._-]", "_")
                      .replaceAll("\\.\\.", "_")
                      .replaceAll("^\\s+|\\s+$", "");
    }
}
