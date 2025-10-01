import { Outlet, useLocation } from "react-router-dom";
import { Box, Flex, Heading } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import Sidebar from "@/components/views/Sidebar";

const AdminLayout = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();

  const segments = pathname.split("/").filter(Boolean);

  // show heading only on top-level routes like "/dashboard"
  const showHeading = segments.length === 1;

  const pageTitle = segments[0] || "dashboard";

  // Create a snake_case, lowercase translation key
  const translationKey = pageTitle.replace(/-/g, " ").replace(/\s+/g, "_").toLowerCase();

  // Optional pretty title fallback if translation key not found
  const formattedTitle = translationKey.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());

  return (
    <Flex fontFamily="Hanuman, Poppins-Regular">
      <Sidebar />
      <Box flex="1" bg="gray.50">
        {showHeading && (
          <Flex height="70px" bg="white" alignItems="center" px="1rem" boxShadow="sm">
            <Heading as="h2" fontFamily="Hanuman, Poppins-Regular" fontSize="xl">
              {t(translationKey, formattedTitle)}
            </Heading>
          </Flex>
        )}
        <Box height={showHeading ? "calc(100dvh - 70px)" : "100dvh"} overflowY="auto">
          <Outlet />
        </Box>
      </Box>
    </Flex>
  );
};

export default AdminLayout;
