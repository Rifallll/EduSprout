import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const NewsSkeleton = () => {
    return (
        <Card className="glass-dark border-white/5 overflow-hidden flex flex-col h-full animate-pulse">
            <div className="aspect-video bg-white/5" />
            <CardHeader className="space-y-4 p-6">
                <div className="flex gap-2">
                    <div className="h-4 w-16 bg-white/10 rounded-full" />
                    <div className="h-4 w-16 bg-white/10 rounded-full" />
                </div>
                <div className="h-6 w-full bg-white/10 rounded-md" />
                <div className="h-6 w-3/4 bg-white/10 rounded-md" />
            </CardHeader>
            <CardContent className="p-6 pt-0 space-y-3">
                <div className="h-4 w-full bg-white/5 rounded-md" />
                <div className="h-4 w-full bg-white/5 rounded-md" />
                <div className="h-4 w-2/3 bg-white/5 rounded-md" />
            </CardContent>
        </Card>
    );
};

export default NewsSkeleton;
