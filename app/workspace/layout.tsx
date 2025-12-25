"use client";

import React from "react";
import { Provider } from "react-redux";
import store from "@/stores"; // Ensure correct import

import "./workspce.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <div className="root-layout">
        {/* Navigation Bar */}
        <header className="layout-header">
          <nav className="navbar">
            <h1 className="navbar-title">Workspace App</h1>
            <ul className="navbar-links">
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/workspace">Workspace</a>
              </li>
              <li>
                <a href="/about">About</a>
              </li>
            </ul>
          </nav>
        </header>

        {/* Main Content Area */}
        <div className="layout-content">
          {/* Sidebar */}
          <aside className="sidebar">
            <ul className="sidebar-menu">
              <li>
                <a href="/tools/shape-drawer">Shape Drawer</a>
              </li>
              <li>
                <a href="/tools/canvas-2d">2D Canvas</a>
              </li>
              <li>
                <a href="/tools/canvas-3d">3D Canvas</a>
              </li>
              <li>
                <a href="/tools/trim-tool">Trim Tool</a>
              </li>
              <li>
                <a href="/tools/spline-tool">Spline Tool</a>
              </li>
            </ul>
          </aside>

          {/* Main Workspace */}
          <main className="layout-main">{children}</main>
        </div>

        {/* Footer */}
        <footer className="layout-footer">
          <p>&copy; {new Date().getFullYear()} Workspace App. All rights reserved.</p>
        </footer>
      </div>
    </Provider>
  );
}
